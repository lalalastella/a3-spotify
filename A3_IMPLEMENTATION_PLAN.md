# A3 Implementation and Acceptance Plan

## Goal

Complete the required 10-point Angular Spotify Browser against the Canvas dummy
webserver, verify every rubric item, and produce a submission-ready ZIP without
`node_modules`.

## Gate 1: Workspace and runtime

- [x] Starter repository is present locally.
- [ ] The shared GitHub Classroom/team repository is connected and its existing work is reconciled before delivery.
- [ ] Canvas `dummy_webserver` is downloaded and unpacked.
- [x] Dependencies install for the Angular client.
- [x] A contract-compatible acceptance server responds on `127.0.0.1:8888`.
- [x] Angular client serves on `localhost:4200`.

## Gate 2: Spotify service (1 point and dependency for all pages)

- [x] `sendRequestToExpress` calls the Express base URL.
- [x] Search handles artist, album, and track response shapes.
- [x] Artist, artist albums, and artist top tracks endpoints are implemented.
- [x] Album and album tracks endpoints are implemented.
- [x] Track endpoint is implemented.
- [x] Dynamic path values are URL encoded.

## Gate 3: Home page and reusable components (4 points)

- [x] About component loads and displays profile data.
- [x] Search input, category selector, and button are bound.
- [x] Artist/album results render in the carousel.
- [x] Track results render in the track list.
- [x] Carousel cards route to local resource pages.
- [x] Track rows show index, name, duration, artist, and album.
- [x] Track list conditionally hides artist and album columns.
- [x] Thermometer displays label, percent, width, and color.

## Gate 4: Detail pages (5 points)

- [x] Artist page shows profile details, followers, popularity, albums, and top tracks (3 points).
- [x] Album page shows details, artists, popularity, and tracks with redundant columns hidden (1.5 points).
- [x] Track page shows album, all artists, duration, Spotify link, and popularity (0.5 points).
- [x] Internal links use Angular routes; only explicit Spotify links are external.
- [x] Templates guard asynchronous data before dereferencing it.

## Gate 5: Quality assurance

- [x] TypeScript and Angular template compilation succeeds.
- [x] Production build succeeds.
- [x] Existing starter-only test/lint incompatibilities are documented in the acceptance report.
- [x] Home, search modes, artist, album, and track routes are exercised in a browser.
- [x] Browser console has no application errors during the acceptance flow.

## Gate 6: Submission package

- [ ] `readme.txt` contains both partners' identifying information, A3 Pair 47,
      claimed points, time, consulted resources, bonus status, and run notes.
- [ ] Partner survey requirement is called out for both students.
- [ ] `node_modules` is absent from the ZIP.
- [ ] ZIP contents are audited and the archive opens successfully.
- [ ] Canvas upload is performed only after explicit confirmation.

## Execution order

Service -> shared components -> Home search -> Artist -> Album -> Track -> build
and browser QA -> README -> clean ZIP.

Bonus work is intentionally deferred until every required rubric item passes.
