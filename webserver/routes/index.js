var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var credentials = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client_secret.json'), 'utf8'));
var my_client_id = credentials.client_id;
var my_client_secret = credentials.client_secret;

var redirect_uri = 'http://127.0.0.1:8888/callback';
var client_uri = 'http://127.0.0.1:4200';
var login_success_uri = client_uri + '/?login=success';

function authorizationHeaders() {
	return {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + Buffer.from(my_client_id + ':' + my_client_secret).toString('base64')
	};
}

function saveSession(req) {
	return new Promise((resolve, reject) => {
		req.session.save((err) => err ? reject(err) : resolve());
	});
}

async function refresh(req) {
	var spotifySession = req.session.spotify;
	if(!spotifySession || !spotifySession.refresh_token) {
		throw new Error('No refresh token is available for this session');
	}

	const params = new URLSearchParams();
	params.append('refresh_token', spotifySession.refresh_token);
	params.append('grant_type', 'refresh_token');

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body: params,
		headers: authorizationHeaders()
	});
	if(!response.ok) {
		throw new Error('Spotify token refresh failed');
	}

	const json = await response.json();
	spotifySession.access_token = json.access_token;
	if(json.refresh_token) {
		spotifySession.refresh_token = json.refresh_token;
	}
	req.session.spotify = spotifySession;
	await saveSession(req);
}

function spotifyHeaders(accessToken) {
	return { 'Authorization': 'Bearer ' + accessToken };
}

async function makeAPIRequest(req, url, res) {
	try {
		if(!req.session.spotify || !req.session.spotify.access_token) {
			res.status(401).json({error: 'Not authenticated'});
			return;
		}

		let response = await fetch(url, {
			method: 'GET',
			headers: spotifyHeaders(req.session.spotify.access_token)
		});

		if(response.status === 401 && req.session.spotify.refresh_token) {
			await refresh(req);
			response = await fetch(url, {
				method: 'GET',
				headers: spotifyHeaders(req.session.spotify.access_token)
			});
		}

		if(!response.ok) {
			res.status(response.status).json({error: 'Spotify API request failed'});
			return;
		}

		res.json(await response.json());
	} catch(err) {
		console.error(err);
		if(!res.headersSent) {
			res.status(500).json({error: 'Spotify request failed'});
		}
	}
}

router.get('/login', function(req, res) {
	var scopes = 'user-read-private user-read-email';
	var state = crypto.randomBytes(16).toString('hex');
	req.session.oauthState = state;
	req.session.save(() => {
		res.redirect('https://accounts.spotify.com/authorize' +
		  '?response_type=code' +
		  '&client_id=' + my_client_id +
		  '&state=' + encodeURIComponent(state) +
		  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
		  '&redirect_uri=' + encodeURIComponent(redirect_uri));
	});
});

router.get('/callback', async function(req, res) {
	var code = req.query.code || null;
	var error = req.query.error || null;
	var state = req.query.state || null;

	if(error || !code || !state || state !== req.session.oauthState) {
		res.redirect(client_uri + '/?login=error');
		return;
	}

	delete req.session.oauthState;
	const params = new URLSearchParams();
	params.append('code', code);
	params.append('redirect_uri', redirect_uri);
	params.append('grant_type', 'authorization_code');

	try {
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			body: params,
			headers: authorizationHeaders()
		});
		if(!response.ok) {
			res.redirect(client_uri + '/?login=error');
			return;
		}

		const json = await response.json();
		req.session.spotify = {
			access_token: json.access_token,
			refresh_token: json.refresh_token
		};
		await saveSession(req);
		res.redirect(login_success_uri);
	} catch(err) {
		console.error(err);
		res.redirect(client_uri + '/?login=error');
	}
});

router.get('/logout', function(req, res) {
	req.session.destroy(() => {
		res.clearCookie('tunecrate.sid');
		res.redirect(client_uri);
	});
});

// Lets the Angular client validate a cached login without loading the profile.
// The Canvas dummy server does not expose this bonus-only endpoint, so a 404
// also tells the client to discard stale OAuth state and use anonymous mode.
router.get('/session', function(req, res) {
	res.json({
		authenticated: Boolean(req.session.spotify && req.session.spotify.access_token)
	});
});

router.get('/me', function(req, res) {
	makeAPIRequest(req, 'https://api.spotify.com/v1/me', res);
});

router.get('/search/:category/:resource', function(req, res) {
	var params = new URLSearchParams();
	params.append('q', req.params.resource);
	params.append('type', req.params.category);
	makeAPIRequest(req, 'https://api.spotify.com/v1/search?' + params, res);
});

router.get('/artist/:id', function(req, res) {
	makeAPIRequest(req, 'https://api.spotify.com/v1/artists/' + req.params.id, res);
});

router.get('/artist-albums/:id', function(req, res) {
	makeAPIRequest(req, 'https://api.spotify.com/v1/artists/' + req.params.id + '/albums', res);
});

router.get('/artist-top-tracks/:id', function(req, res) {
	makeAPIRequest(req, 'https://api.spotify.com/v1/artists/' + req.params.id + '/top-tracks?country=US', res);
});

router.get('/album/:id', function(req, res) {
	makeAPIRequest(req, 'https://api.spotify.com/v1/albums/' + req.params.id, res);
});

router.get('/album-tracks/:id', function(req, res) {
	makeAPIRequest(req, 'https://api.spotify.com/v1/albums/' + req.params.id + '/tracks', res);
});

router.get('/track/:id', function(req, res) {
	makeAPIRequest(req, 'https://api.spotify.com/v1/tracks/' + req.params.id, res);
});

module.exports = router;
