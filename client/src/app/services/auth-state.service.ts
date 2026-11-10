import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

export interface ConnectedProfile {
  name:string;
  imageURL:string;
  spotifyProfile?:string;
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly storageKey = 'tunecrate-spotify-connected';
  private readonly profileStorageKey = 'tunecrate-spotify-profile';
  private readonly sessionModeKey = 'tunecrate-session-mode';
  private readonly connectedSubject = new BehaviorSubject<boolean>(this.readStoredState());
  private readonly profileSubject = new BehaviorSubject<ConnectedProfile>(this.readStoredProfile());
  private sessionModeEnabled = localStorage.getItem(this.sessionModeKey) === 'true' || this.readStoredState();

  readonly connected$ = this.connectedSubject.asObservable();
  readonly profile$ = this.profileSubject.asObservable();

  constructor(private http:HttpClient) {}

  get isConnected():boolean {
    return this.connectedSubject.value;
  }

  get sessionMode():boolean {
    return this.sessionModeEnabled;
  }

  get profile():ConnectedProfile {
    return this.profileSubject.value;
  }

  enableSessionMode() {
    this.sessionModeEnabled = true;
    localStorage.setItem(this.sessionModeKey, 'true');
  }

  markSessionConnected() {
    this.enableSessionMode();
    this.connectedSubject.next(true);
    this.profileSubject.next(null);
    localStorage.setItem(this.storageKey, 'true');
    localStorage.removeItem(this.profileStorageKey);
  }

  setProfile(profile:ConnectedProfile) {
    this.connectedSubject.next(true);
    this.profileSubject.next(profile);
    this.enableSessionMode();
    localStorage.setItem(this.storageKey, 'true');
    localStorage.setItem(this.profileStorageKey, JSON.stringify(profile));
  }

  clear() {
    this.connectedSubject.next(false);
    this.profileSubject.next(null);
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.profileStorageKey);
    localStorage.removeItem(this.sessionModeKey);
    this.sessionModeEnabled = false;
  }

  async validateStoredSession():Promise<void> {
    if(!this.sessionModeEnabled) {
      return;
    }

    try {
      const status:any = await firstValueFrom(this.http.get(
        'http://127.0.0.1:8888/session',
        {withCredentials: true}
      ));
      if(!status || status.authenticated !== true) {
        this.clear();
      }
    } catch {
      // No /session route (dummy server) or server restarted: treat as logged out.
      this.clear();
    }
  }

  private readStoredState():boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  private readStoredProfile():ConnectedProfile {
    try {
      return JSON.parse(localStorage.getItem(this.profileStorageKey));
    } catch {
      return null;
    }
  }
}
