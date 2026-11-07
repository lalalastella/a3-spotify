import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-album-page',
    templateUrl: './album-page.component.html',
    styleUrls: ['./album-page.component.css'],
    standalone: false
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];
	isSaved = false;


  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService, private favoritesService:FavoritesService) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');
    this.spotifyService.getAlbum(this.albumId).then((album) => {
      this.album = album;
      this.isSaved = this.favoritesService.isFavorite(album);
    });
    this.spotifyService.getTracksForAlbum(this.albumId).then((tracks) => this.tracks = tracks);
  }

  toggleFavorite() {
    this.isSaved = this.favoritesService.toggle(this.album);
  }

}
