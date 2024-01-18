// fav.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IVideoContent } from '../models/ivideo-content';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  private favorites: IVideoContent[] = [];

  getFavorites(): IVideoContent[] {
    console.log('Favorites:', this.favorites);
    return this.favorites;
  }

  addToFavorites(movie: IVideoContent): void {
    this.favorites.push(movie);
    console.log('Added to favorites:', movie);
  }

  removeFromFavorites(movie: IVideoContent): void {
    this.favorites = this.favorites.filter((m) => m.id !== movie.id);
    console.log('Removed from favorites:', movie);
  }

  isFavorite(movie: IVideoContent): boolean {
    return this.favorites.some((m) => m.id === movie.id);
  }
}
