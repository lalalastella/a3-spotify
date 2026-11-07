import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ConnectedProfile {
  name:string;
  imageURL:string;
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly storageKey = 'tunecrate-spotify-connected';
  private readonly profileStorageKey = 'tunecrate-spotify-profile';
  private readonly connectedSubject = new BehaviorSubject<boolean>(this.readStoredState());
  private readonly profileSubject = new BehaviorSubject<ConnectedProfile>(this.readStoredProfile());

  readonly connected$ = this.connectedSubject.asObservable();
  readonly profile$ = this.profileSubject.asObservable();

  get isConnected():boolean {
    return this.connectedSubject.value;
  }

  setProfile(profile:ConnectedProfile) {
    this.connectedSubject.next(true);
    this.profileSubject.next(profile);
    localStorage.setItem(this.storageKey, 'true');
    localStorage.setItem(this.profileStorageKey, JSON.stringify(profile));
  }

  clear() {
    this.connectedSubject.next(false);
    this.profileSubject.next(null);
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.profileStorageKey);
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
