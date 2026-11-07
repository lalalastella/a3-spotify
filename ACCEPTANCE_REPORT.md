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
| Profile | 1/1 | Load button displayed the mock profile name, image fallback, and external URL. |
| Search | 3/3 | Artist and album searches rendered carousels; track search rendered the track table. |
| Artist page | 3/3 | Displayed identity, formatted followers, 82% popularity, albums, and top tracks. |
| Album page | 1.5/1.5 | Displayed album data, artist links, 73% popularity, and tracks with redundant columns hidden. |
| Track page | 0.5/0.5 | Displayed album, all artists, 3:05 duration, Spotify URL, and 91% popularity. |

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

- Production build hash `3dfc2f98c670f1bc`: PASS with no warnings.
- Profile, artist/album/track search, Artist page, Album page, and Track page: PASS.
- Internal route targets and Album hidden-column behavior: PASS.
- Browser console error count: 0.
- Provisional archive: 114 entries; `node_modules`, `client/dist`,
  `client/.angular`, and `.git` entries: 0.

The starter's Karma specs do not compile under its own Angular 19 dependency:
they import the removed `async` testing helper. The starter ESLint configuration
also requires standalone components even though every supplied component and
`AppModule` use the provided NgModule architecture. Those baseline checks were
not rewritten because the assignment explicitly says the spec files do not need
editing and the production application compiles and runs correctly.

## Runtime test contract

Because the Canvas CDN download was blocked by the controlled browser, runtime
acceptance used a temporary local server that mirrors the documented dummy
server endpoints and Spotify response shapes. The temporary server is outside
the submission and is not included in the repository. The implementation uses
the exact endpoint paths defined by the supplied Express routes.

Before submission, run one final smoke test with Canvas's `dummy_webserver` if
available locally. The assignment permits excluding both server folders from
the submitted ZIP.

## Submission blockers

The implementation is committed and pushed to the private repository
`lalalastella/inf133-a3-spotify`. This is a normal private repository, not the
course GitHub Classroom/team repository, and no collaborator has been invited.

The README and final ZIP also require one user-supplied fact:

1. Total hours to report.

Both partners must separately complete the Canvas partner survey. Only one
partner needs to upload the ZIP.
