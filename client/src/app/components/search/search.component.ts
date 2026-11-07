import { Component, HostListener, OnInit } from '@angular/core';
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
  isCategoryMenuOpen:boolean = false;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  toggleCategoryMenu() {
    this.isCategoryMenuOpen = !this.isCategoryMenuOpen;
  }

  selectCategory(category:string) {
    this.searchCategory = category;
    this.resources = null;
    this.errorMessage = null;
    this.isCategoryMenuOpen = false;
  }

  categoryIcon(category:string):string {
    return category === 'artist' ? '♫' : category === 'album' ? '▣' : '♪';
  }

  onCategoryTriggerKeydown(event:KeyboardEvent) {
    if(event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.isCategoryMenuOpen = true;
    } else if(event.key === 'Escape') {
      this.isCategoryMenuOpen = false;
    }
  }

  @HostListener('document:click')
  closeCategoryMenu() {
    this.isCategoryMenuOpen = false;
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
    }).catch((error) => {
      this.resources = [];
      if(error?.status === 401) {
        this.errorMessage = 'Your Spotify session has expired. Log in again to search.';
      } else if(error?.status === 0) {
        this.errorMessage = 'The course server is unavailable. Start the server on port 8888 and try again.';
      } else {
        this.errorMessage = 'Search could not be completed. Try again in a moment.';
      }
      this.isLoading = false;
    });
  }

  get tracks():TrackData[] {
    return this.resources as TrackData[];
  }

}
