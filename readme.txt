--Readme document for Stella Jiang (yuxuj10@uci.edu, student ID: 83089982) and Tracy Zexi Chen (zexic7@uci.edu, student ID: 76111328)--
--Canvas group: A3 Pair 47--

1. How many assignment points do you believe you completed?

11/10
- 1/1 Communicating with the webserver
- 1/1 Populating information about the user
- 3/3 Populating the search component
- 3/3 Artist page
- 1.5/1.5 Album page
- 0.5/0.5 Track page
- +1 Bonus: multiple users (see question 5) & Favoriate

We ran everything against the Canvas dummy_webserver and saved screenshots in
the "screenshots" folder:
- 1-home-profile-artist-search.jpg: after clicking "Load info about me", the
  user's name, picture, and "Open profile on Spotify" link show up. An artist
  search shows its results in a carousel.
- 2-artist-page.jpg: artist page with followers, popularity bar, albums, and top tracks
- 3-album-page.jpg: album page with its popularity bar and track list
- 4-track-page.jpg: track page with the album, artists, duration, and popularity bar
- 5-track-search.jpg: a track search shows a table of tracks
- 6-album-search.jpg: an album search shows a carousel

2. How long, in hours, did it take you to complete this assignment?

About 12 hours.

3. What online resources did you consult when completing this assignment? (list specific URLs)

- The Canvas assignment page and the lecture slides (L10, L11)
- https://github.com/travislindenreid/a3-spotify (the starter code)

Angular:
- https://angular.dev/guide/templates/control-flow (@if and @for in templates)
- https://angular.dev/api/core/@for (looping over tracks and carousel cards)
- https://angular.dev/guide/templates/binding (binding src, href, style)
- https://angular.dev/guide/forms/template-driven-forms
- https://angular.dev/api/forms/NgModel (search box and dropdown)
- https://angular.dev/guide/routing
- https://angular.dev/api/router/RouterLink (links to artist/album/track pages)
- https://angular.dev/api/router/ActivatedRoute (reading the id from the URL)
- https://angular.dev/guide/http
- https://angular.dev/guide/http/making-requests

Spotify API:
- https://developer.spotify.com/documentation/web-api/reference/

Other:
- https://getbootstrap.com/docs/5.3/components/carousel/
- https://getbootstrap.com/docs/5.3/components/progress/
- https://gka.github.io/chroma.js/ (popularity bar color)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
- https://github.com/expressjs/session (bonus)

We also used AI tools. Stella used OpenAI Codex while planning and
debugging her code. Tracy used Claude Code to learn the code related to the
assignment and debugging. We asked questions like "....(copy paste the code) Why does this not show the correct feature (explain the details of the features we want)? What's the reason? How should we improve?"

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

Nobody outside the two of us. This is how we split the work.

Both of us:
- Set up the project and got it running with the Canvas dummy_webserver
- Wrote sendRequestToExpress in the Spotify service
- Tested each other's pages at the end

Stella Jiang:
- The search, artist, album, and track functions in the Spotify service
- The about and search components on the home page
- The thermometer component
- The artist, album, and track pages
- The bonus webserver changes and the Favorites page
- Checking each part against the assignment and testing 

Tracy Zexi Chen:
- The track-list component, which the artist and album pages also use
- The carousel and carousel-card components
- Popularity bar color: it now goes from red for low scores to green for high ones
- A fix on the artist page: going straight from one artist to another used to
  keep showing the first artist, and now it loads the new one
- Checking each part against the assignment, testing every page, and taking the screenshots

5. Did you add a bonus feature to your submission? If so, what is it and how should we see it?

Yes, the multiple-users bonus. The original webserver keeps everyone's login
in one shared tokens.json file. We changed our "webserver" folder so each
browser gets its own login session. Stella tested it with her Spotify Premium
account.

extra_credit.mp4 shows it working: two Spotify accounts are logged in at the
same time, one in a normal window and one in a private window, and each window
shows its own profile. After one of them logs out, the other is still logged
in and can still search.

To try it:
1. Copy webserver/client_secret.example.json to webserver/client_secret.json
   and fill in your Spotify app's client id and secret. The app's redirect URI
   must be http://127.0.0.1:8888/callback.
2. Stop the dummy server, then run npm install and npm start in "webserver".
3. In "client", run npm start -- --host 127.0.0.1 and open http://127.0.0.1:4200.
4. Click "Log in" and then "Load info about me".
5. Open a private window and log in there too. Logging out in one window does
   not log out the other one.

Stella also added a small Favorites feature, which isn't one of the official
bonus options. On any artist, album, or track page, click "Save to favorites",
then click "Favorites" at the top to see what you saved. Favorites are stored
in your browser.

6. Is there anything special we need to know in order to run your code?

To work with the Canvas dummy server, which needs no login:
1. In the dummy_webserver folder, run npm install, then npm start. It runs at
   http://127.0.0.1:8888.
2. In this project's "client" folder, run npm install, then ng serve.
3. Open http://localhost:4200.
4. Click "Load info about me", then search for an artist, album, or track.

You can ignore the "Log in" button. It only does something with the real
Spotify webserver.

Only one server can use port 8888 at a time, so run either dummy_webserver or
our "webserver" folder, not both.
