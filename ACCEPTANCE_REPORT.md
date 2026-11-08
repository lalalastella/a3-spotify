# A3 Acceptance Report

Date: November 7, 2026
Course: IN4MATX 133
Assignment: A3 Spotify Browser in Angular
Implementation author: Stella Jiang
Canvas group: A3 Pair 47

## Rubric result

| Area | Points targeted | Acceptance evidence |
| --- | ---: | --- |
| Express communication | 1/1 | All required endpoints were exercised through `SpotifyService` on port 8888. |
| Profile | 1/1 | Official dummy `/me` displayed CS Student, profile image, and Spotify URL after the load-button click. |
| Search | 3/3 | Official dummy Artist and Album searches rendered carousels; Track search rendered the complete track table. |
| Artist page | 3/3 | Taylor Swift displayed identity, formatted followers, 99% popularity, albums, and top tracks. |
| Album page | 1.5/1.5 | Official dummy album displayed data, artist link, 73% popularity, and tracks with redundant columns hidden. |
| Track page | 0.5/0.5 | Official dummy track displayed album, artist, 3:46 duration, Spotify URL, and 45% popularity. |

Target: 10/10 required points plus the 1-point official multi-user bonus.

Bonus evidence: the non-dummy Express server uses `express-session`; access and
refresh tokens live inside the requesting browser's server-side session, API
requests read only that session, and Logout destroys only that session. The
client sends credentials only after a real OAuth callback so the required
Canvas dummy server flow remains compatible. A Local Favorites Library is also
included, though the assignment caps bonus credit at one point.

## Automated validation

- `npm run build`: PASS (production Angular build).
- `ng serve`: PASS; compiled successfully on `127.0.0.1:4200`.
- Browser acceptance: PASS for profile, all three search categories, and all three detail routes.
- Browser console: PASS; zero error-level entries during the acceptance flow.
- Multi-user session isolation: PASS; two independent browser cookies were
  issued and both unauthenticated sessions received `401` from `/me` without
  gaining access to another session's Spotify data.
- Remaining `TODO`/`???` markers under `client/src/app`: none.

Final re-validation on November 7, 2026:

- Production build hash `8fcfceda2435b963`: PASS with no warnings.
- Profile, artist/album/track search, Artist page, Album page, and Track page: PASS.
- Internal route targets and Album hidden-column behavior: PASS.
- Browser console error count: 0.
- Provisional archive: 122 entries; `node_modules`, `client/dist`,
  `client/.angular`, and `.git` entries: 0.
- Sensitive-file audit: `client_secret.json` and `tokens.json` are ignored,
  untracked, and absent from the provisional archive.

The starter's Karma specs do not compile under its own Angular 19 dependency:
they import the removed `async` testing helper. The starter ESLint configuration
also requires standalone components even though every supplied component and
`AppModule` use the provided NgModule architecture. Those baseline checks were
not rewritten because the assignment explicitly says the spec files do not need
editing and the production application compiles and runs correctly.

## Official dummy-server verification

After Canvas authorization was refreshed, the official `dummy_webserver.zip`
linked from Assignment 3 was downloaded to a temporary directory and used for
the final browser acceptance run. `/me`, all three search categories, and the
Artist, Album, and Track routes passed; the browser console recorded zero
errors. Canvas course data and the dummy server are not included in this repo.

## Repository and submission status

The implementation is committed and pushed to `lalalastella/a3-spotify`, a
verified GitHub fork of the instructor repository
`travislindenreid/a3-spotify`. The instructor's `master` history and the full
TuneCrate implementation history are both retained. `TracyZexiChen` has been
invited to the fork with Write permission; accepting the invitation does not
change the authorship of Stella's existing commits.

The README and final ZIP still require one user-supplied fact:

1. Total hours to report.

Every group member must separately complete the Canvas partner survey. Only one
group member needs to upload the ZIP.
