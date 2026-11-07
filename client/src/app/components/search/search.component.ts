import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SpotifyService],
    standalone: false
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  isLoading:boolean = false;
  errorMessage:string = null;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    const query = this.searchString ? this.searchString.trim() : '';
    if(!query) {
      this.resources = [];
      this.errorMessage = 'Enter an artist, album, or track to start searching.';
      return;
    }
    this.resources = null;
    this.errorMessage = null;
    this.isLoading = true;
    this.spotifyService.searchFor(this.searchCategory, query).then((resources) => {
      this.resources = resources;
      this.isLoading = false;
    }).catch(() => {
      this.resources = [];
      this.errorMessage = 'Search could not be completed. Check your Spotify login and try again.';
      this.isLoading = false;
    });
  }

  get tracks():TrackData[] {
    return this.resources as TrackData[];
  }

}
