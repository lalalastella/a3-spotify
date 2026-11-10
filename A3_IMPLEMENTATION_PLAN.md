# A3 Implementation and Acceptance Plan

Stella Jiang and Tracy Zexi Chen (A3 Pair 47)

## Goal

Build the Angular Spotify Browser, run it against the Canvas dummy
webserver, check every rubric item, and submit a ZIP without `node_modules`.

Owner tags: [Both], [Stella], [Tracy]

## Gate 1: Workspace and runtime

- [x] [Both] Starter repository is present locally.
- [x] [Both] Canvas `dummy_webserver` is downloaded and runs on `127.0.0.1:8888`.
      It is not stored in this repo.
- [x] [Both] Dependencies install for the Angular client.
- [x] [Both] Angular client runs on `localhost:4200`.

## Gate 2: Spotify service (1 point, needed by every page)

- [x] [Both] `sendRequestToExpress` calls the Express base URL.
- [x] [Stella] Search handles artist, album, and track results.
- [x] [Stella] Artist, artist albums, and artist top tracks endpoints.
- [x] [Stella] Album and album tracks endpoints.
- [x] [Stella] Track endpoint.
- [x] [Stella] Ids and search text are URL encoded.

## Gate 3: Home page and shared components (4 points)

- [x] [Stella] About component loads and shows the profile.
- [x] [Stella] Search input, category dropdown, and button are bound.
- [x] [Tracy] Carousel shows artist and album results.
- [x] [Tracy] Carousel cards link to the local artist or album page.
- [x] [Tracy] Track list shows index, name, duration, artist, and album.
- [x] [Tracy] Track list can hide the artist and album columns.
- [x] [Stella] Search shows tracks in the track list.
- [x] [Stella] Thermometer shows the label, percent, and bar width.
- [x] [Tracy] Thermometer bar color goes from red (low) to green (high).

## Gate 4: Detail pages (5 points)

- [x] [Stella] Artist page shows the name, image, followers, popularity, albums,
      and top tracks (3 points).
- [x] [Tracy] Going from one artist page straight to another loads the new artist.
- [x] [Stella] Album page shows the details, artists, popularity, and tracks
      without the extra columns (1.5 points).
- [x] [Stella] Track page shows the album, all artists, duration, Spotify link,
      and popularity (0.5 points).
- [x] [Both] Links inside the app use Angular routes. Only the "on Spotify"
      links go to Spotify.com.
- [x] [Both] Pages wait for data before showing it.

## Gate 5: Testing

- [x] [Both] The client builds without errors.
- [x] [Tracy] Home page, all three search types, and the artist, album, and track
      pages work in the browser.
- [x] [Both] No app errors in the browser console.
- [x] [Both] Full run against the Canvas `dummy_webserver`, with screenshots
      in the `screenshots` folder.
- [x] [Both] Each of us tested the other's pages.


## Bonus (optional)

- [x] [Stella] Multi-user webserver: each browser keeps its own login session.
      Stella tested it with her Spotify Premium account.
- [x] [Stella] Favorites page, saved in the browser. This is not an official bonus.

## Order

1. Both: set up and write `sendRequestToExpress`.
2. Tracy: track list and carousel first, since the artist and album pages need them.
   Stella: thermometer and track page at the same time.
3. Stella: about, search, artist page, and album page.
4. Both: test each other's work. 
