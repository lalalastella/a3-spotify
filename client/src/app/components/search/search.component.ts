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

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    const query = this.searchString ? this.searchString.trim() : '';
    if(!query) {
      this.resources = [];
      return;
    }
    this.resources = null;
    this.spotifyService.searchFor(this.searchCategory, query).then((resources) => {
      this.resources = resources;
    });
  }

  get tracks():TrackData[] {
    return this.resources as TrackData[];
  }

}
