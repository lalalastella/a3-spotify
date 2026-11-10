import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://127.0.0.1:8888';

  constructor(private http:HttpClient, private authState:AuthStateService) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    const uri:string = this.expressBaseUrl + endpoint;

    // Normal request (dummy server). Cookies are only sent after a real Spotify login.
    if(!this.authState.sessionMode) {
      return firstValueFrom(this.http.get(uri));
    }

    return firstValueFrom(this.http.get(uri, {withCredentials: true})).catch((error) => {
      // If the real server is gone, try again without cookies and forget the old login.
      if(error?.status !== 0) {
        throw error;
      }

      return firstValueFrom(this.http.get(uri)).then((data) => {
        this.authState.clear();
        return data;
      });
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    const endpoint = '/search/' + encodeURIComponent(category) + '/' + encodeURIComponent(resource);
    return this.sendRequestToExpress(endpoint).then((data) => {
      switch(category) {
        case 'artist':
          return data.artists.items.map((artist) => new ArtistData(artist));
        case 'album':
          return data.albums.items.map((album) => new AlbumData(album));
        case 'track':
          return data.tracks.items.map((track) => new TrackData(track));
        default:
          throw new Error('Unsupported search category: ' + category);
      }
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId)).then((data) => {
      return new ArtistData(data);
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId)).then((data) => {
      return data.tracks.map((track) => new TrackData(track));
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId)).then((data) => {
      return data.items.map((album) => new AlbumData(album));
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    return this.sendRequestToExpress('/album/' + encodeURIComponent(albumId)).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId)).then((data) => {
      return data.items.map((track) => new TrackData(track));
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    return this.sendRequestToExpress('/track/' + encodeURIComponent(trackId)).then((data) => {
      return new TrackData(data);
    });
  }
}
