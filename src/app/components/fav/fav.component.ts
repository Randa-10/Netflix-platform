import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FavService } from '../../shared/services/fav.service';
import { NgFor, NgIf } from '@angular/common';
import { IVideoContent } from '../../shared/models/ivideo-content';
import { ImgPipe } from "../../shared/pipe/img.pipe";
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-fav',
    standalone: true,
    templateUrl: './fav.component.html',
    styleUrl: './fav.component.scss',
    imports: [NgFor, NgIf, ImgPipe,HeaderComponent,RouterModule,FooterComponent]
})
export class FavComponent implements OnInit {
  favorites: IVideoContent[] = [];
  userProfileImg!: string;

  constructor(private favoriteService: FavService) {}

  ngOnInit(): void {
    this.favorites = this.favoriteService.getFavorites();
    console.log('Favorites:', this.favorites);
  }

  toggleFavorite(movie: IVideoContent): void {
    if (this.favoriteService.isFavorite(movie)) {
      this.favoriteService.removeFromFavorites(movie);
      this.favorites = this.favorites.filter(favMovie => favMovie.id !== movie.id);
    } else {
      this.favoriteService.addToFavorites(movie);
    }
  }
}
