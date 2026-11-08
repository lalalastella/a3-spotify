--Readme document for Stella Jiang (yuxuj10@uci.edu, student ID: 83089982)--
--Partner: none; Stella Jiang is the sole implementation author--
--Canvas group: A3 Pair 47--
--Project: TuneCrate — INF133 Spotify Browser--

1. How many assignment points do you believe you completed?

11/10 (10 required points + 1 official extra-credit point)
- 1/1 Communicating with the webserver
- 1/1 Populating information about the user
- 3/3 Populating the search component
- 3/3 Artist page
- 1.5/1.5 Album page
- 0.5/0.5 Track page
- +1 Official multi-user session bonus

2. How long, in hours, did it take you to complete this assignment?

[REQUIRED BEFORE SUBMISSION: ENTER TOTAL HOURS] hours.

3. What online resources did you consult when completing this assignment? (list specific URLs)

Canvas assignment instructions and rubric; the provided A3 starter repository;
and the following documentation:

- https://canvas.eee.uci.edu/courses/85916/assignments/1904213
- https://github.com/travislindenreid/a3-spotify
- https://angular.dev/guide/templates/control-flow
- https://angular.dev/guide/forms/template-driven-forms
- https://angular.dev/guide/routing
- https://angular.dev/guide/http/making-requests
- https://getbootstrap.com/docs/5.3/components/carousel/
- https://getbootstrap.com/docs/5.3/components/progress/
- https://developer.spotify.com/documentation/web-api/tutorials/code-flow
- https://open.spotify.com/album/6T3WdeRv9rqMIlmnloB2Dv
- https://github.com/expressjs/session

OpenAI Codex was used for planning, implementation assistance, debugging,
UI review, documentation, and test-case review. Stella Jiang reviewed and
accepted the submitted implementation and remains its sole author.

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

No classmates or other individuals contributed code. Stella Jiang completed
the coding, integration, testing, and documentation. Canvas currently lists A3
Pair 47; the partner survey will report Stella's contribution accurately.

5. Did you add a bonus feature to your submission? If so, what is it and how should we see it?

Yes. The official multi-user bonus is implemented with express-session. When
the non-dummy webserver is used, each browser session stores its own Spotify
access and refresh tokens instead of sharing tokens.json. Log in from separate
browser sessions to see that profile/search requests remain isolated; Log out
destroys only that browser's server session.

TuneCrate also includes a Local Favorites Library. Open any artist, album, or
track detail page and click "Save to favorites," then use the "Favorites" link
to view or remove saved resources. Favorites persist in that browser using
localStorage.

6. Is there anything special we need to know in order to run your code?

IMPORTANT — choose exactly one server mode for port 8888. The same submitted
Angular client supports both modes, but the two servers cannot run at the same
time. The Canvas dummy server is the required grading path and does not use
Spotify login. The included `webserver` is the optional bonus path and requires
Spotify OAuth login before profile and search requests can use real data.

Required 10-point grading path (Canvas dummy_webserver):

1. Download the Canvas dummy_webserver.
2. Run `npm install` and `npm start` in the dummy_webserver folder. It must
   listen at http://127.0.0.1:8888.
3. Run `npm install` and `npm start` from this repository's `client` folder.
4. Open http://localhost:4200.
5. Click `Load info about me`; no Spotify login is required with the dummy
   server. Test Artist, Album, and Track searches and open their detail pages.

Official multi-user bonus path (included non-dummy webserver):

This path requires a Spotify Premium account, as specified by the assignment.

1. Copy `webserver/client_secret.example.json` to
   `webserver/client_secret.json`, then replace both placeholder values.
2. Add http://127.0.0.1:8888/callback to the Spotify Developer App's redirect
   URIs and add any permitted test users in the Spotify dashboard.
3. Run `npm install` and `npm start` in `webserver`.
4. Run `npm install` and `npm start -- --host 127.0.0.1` in `client`.
5. Open http://127.0.0.1:4200 and choose `Log in`. After Spotify redirects
   back, click `Load info about me` to request `/me` explicitly.
6. To demonstrate isolation, repeat the login in a separate private browser
   window. Each browser receives its own server session; logging out of one
   does not log out the other.

The bonus server uses the default in-memory express-session store, so local
sessions are cleared whenever that server restarts. `client_secret.json`,
`tokens.json`, `.git`, `node_modules`, Angular caches, and build output must not
be included in the submitted ZIP. Complete the Canvas partner survey as
required; only one group submission should be uploaded.
