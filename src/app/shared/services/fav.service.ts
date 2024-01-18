// fav.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavService {
 favoritesSubject = new BehaviorSubject<string[]>([]);
  favorites$ = this.favoritesSubject.asObservable();
  private selectedItemSubject = new BehaviorSubject<string | null>(null);
  selectedItem$ = this.selectedItemSubject.asObservable();

  addToFavorites(item: string) {
    const currentFavorites = this.favoritesSubject.value;
    this.favoritesSubject.next([...currentFavorites, item]);
  }

  removeFromFavorites(item: string) {
    const currentFavorites = this.favoritesSubject.value;
    const updatedFavorites = currentFavorites.filter(fav => fav !== item);
    this.favoritesSubject.next(updatedFavorites);
  }

  setSelectedItem(item: string | null) {
    this.selectedItemSubject.next(item);
  }
}
