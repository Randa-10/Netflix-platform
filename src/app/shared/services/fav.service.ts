// fav.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IVideoContent } from '../models/ivideo-content';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  private favorites: IVideoContent[] = [];
  private myListCountSubject = new BehaviorSubject<number>(0);
  myListCount$: Observable<number> = this.myListCountSubject.asObservable();

  getFavorites(): IVideoContent[] {
    console.log('Favorites:', this.favorites);
    return this.favorites;
  }

  addToFavorites(movie: IVideoContent): void {
    this.favorites.push(movie);
    console.log('Added to favorites:', movie);
       this.updateMyListCount();

  }

  removeFromFavorites(movie: IVideoContent): void {
    this.favorites = this.favorites.filter((m) => m.id !== movie.id);
    console.log('Removed from favorites:', movie);
    this.updateMyListCount();

  }

  isFavorite(movie: IVideoContent): boolean {
    return this.favorites.some((m) => m.id === movie.id);
  }
  private updateMyListCount(): void {
    this.myListCountSubject.next(this.favorites.length);
  }

  getMyListCount(): number {
    return this.favorites.length;
  }



}
