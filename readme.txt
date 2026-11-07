--Readme document for Stella Jiang (yuxuj10@uci.edu, student ID: 83089982)--
--Canvas group: A3 Pair 47--
--Project: TuneCrate — INF133 Spotify Browser--

1. How many assignment points do you believe you completed?

10/10
- 1/1 Communicating with the webserver
- 1/1 Populating information about the user
- 3/3 Populating the search component
- 3/3 Artist page
- 1.5/1.5 Album page
- 0.5/0.5 Track page

2. How long, in hours, did it take you to complete this assignment?

[ADD TOTAL TEAM HOURS] hours.

3. What online resources did you consult when completing this assignment? (list specific URLs)

Canvas assignment instructions and rubric; the provided A3 starter repository;
Angular documentation for template control flow, forms, routing, and HttpClient;
Bootstrap carousel/progress documentation; and generative AI for planning,
implementation assistance, debugging, and test-case review.

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

Stella Jiang is the sole author of the submitted implementation and completed
the required coding, integration, testing, and documentation. No classmates or
other individuals contributed code. Canvas currently lists A3 Pair 47; the
partner survey will accurately report the work distribution.

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

Download the Canvas dummy_webserver, run \`npm install\` and \`npm start\` in that
folder, then run \`npm install\` and \`ng serve\` from the \`client\` folder. Open
http://localhost:4200. The required implementation uses the dummy server at
http://127.0.0.1:8888 and does not require Spotify login. Both group members
must complete the A3 partner survey; only one group member needs to submit the
ZIP.

To test the official multi-user bonus, create ignored
\`webserver/client_secret.json\` with \`client_id\` and \`client_secret\`, add
http://127.0.0.1:8888/callback to the Spotify app's redirect URIs, and run the
included \`webserver\`. The Spotify app owner and each allowlisted test user
must meet Spotify's current Development Mode account requirements.
