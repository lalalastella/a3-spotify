import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-artist-page',
    templateUrl: './artist-page.component.html',
    styleUrls: ['./artist-page.component.css'],
    standalone: false
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	topTracks:TrackData[];
	albums:AlbumData[];
	isSaved = false;

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService, private favoritesService:FavoritesService) { }

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.spotifyService.getArtist(this.artistId).then((artist) => {
      this.artist = artist;
      this.isSaved = this.favoritesService.isFavorite(artist);
    });
    this.spotifyService.getTopTracksForArtist(this.artistId).then((tracks) => this.topTracks = tracks);
    this.spotifyService.getAlbumsForArtist(this.artistId).then((albums) => this.albums = albums);
  }

  toggleFavorite() {
    this.isSaved = this.favoritesService.toggle(this.artist);
  }

  useFallbackImage(event: Event) {
    const image = event.target as HTMLImageElement;
    if (!image.src.endsWith('/assets/unknown.jpg')) {
      image.src = 'assets/unknown.jpg';
    }
  }

}
