import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackData } from '../../data/track-data';
import { SpotifyService } from '../../services/spotify.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css'],
    standalone: false
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
	isSaved = false;

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService, private favoritesService:FavoritesService) { }

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');
    this.spotifyService.getTrack(this.trackId).then((track) => {
      this.track = track;
      this.isSaved = this.favoritesService.isFavorite(track);
    });
  }

  toggleFavorite() {
    this.isSaved = this.favoritesService.toggle(this.track);
  }

}
