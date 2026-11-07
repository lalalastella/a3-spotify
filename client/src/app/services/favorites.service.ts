import { Injectable } from '@angular/core';
import { ResourceData } from '../data/resource-data';

export interface FavoriteItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storageKey = 'inf133-spotify-favorites';

  getAll(): FavoriteItem[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  }

  isFavorite(resource: ResourceData): boolean {
    return this.getAll().some((item) => item.id === resource.id && item.category === resource.category);
  }

  toggle(resource: ResourceData): boolean {
    const favorites = this.getAll();
    const index = favorites.findIndex((item) => item.id === resource.id && item.category === resource.category);

    if(index >= 0) {
      favorites.splice(index, 1);
      this.save(favorites);
      return false;
    }

    favorites.unshift({
      id: resource.id,
      name: resource.name,
      category: resource.category,
      imageURL: resource.imageURL,
      url: resource.url
    });
    this.save(favorites);
    return true;
  }

  remove(item: FavoriteItem) {
    this.save(this.getAll().filter((favorite) => favorite.id !== item.id || favorite.category !== item.category));
  }

  private save(favorites: FavoriteItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
