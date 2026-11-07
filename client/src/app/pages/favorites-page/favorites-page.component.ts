import { Component, OnInit } from '@angular/core';
import { FavoriteItem, FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css'],
  standalone: false
})
export class FavoritesPageComponent implements OnInit {
  favorites: FavoriteItem[] = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.refresh();
  }

  remove(item: FavoriteItem) {
    this.favoritesService.remove(item);
    this.refresh();
  }

  private refresh() {
    this.favorites = this.favoritesService.getAll();
  }
}
