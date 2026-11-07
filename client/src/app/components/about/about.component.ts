import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { AuthStateService } from '../../services/auth-state.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "assets/default-profile.svg";
  profile_link:string = null;
  isLoading:boolean = false;
  errorMessage:string = null;
  loginRequired:boolean = false;


  constructor(private spotifyService:SpotifyService, private authState:AuthStateService) { }

  ngOnInit() {
    const loginSucceeded = new URLSearchParams(window.location.search).get('login') === 'success';
    if(loginSucceeded) {
      this.authState.markSessionConnected();
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  loadProfile() {
    const wasUsingSpotifySession = this.authState.sessionMode;
    this.isLoading = true;
    this.errorMessage = null;
    this.loginRequired = false;
    this.spotifyService.aboutMe().then((profile) => {
      this.name = profile.name;
      this.profile_pic = profile.imageURL;
      this.profile_link = profile.spotifyProfile;
      if(this.authState.sessionMode) {
        this.authState.setProfile({ name: profile.name, imageURL: profile.imageURL });
      }
      this.isLoading = false;
    }).catch((error) => {
      const authenticationRequired = error && error.status === 401;
      this.authState.clear();
      this.loginRequired = authenticationRequired || wasUsingSpotifySession;
      this.errorMessage = this.loginRequired
        ? (wasUsingSpotifySession
          ? 'Your Spotify session has expired. Log in again to reconnect.'
          : 'Log in to Spotify to load your real profile.')
        : 'Profile could not be loaded. Start the course server and try again.';
      this.isLoading = false;
    });
  }

}
