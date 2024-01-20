import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FavService } from '../../shared/services/fav.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IVideoContent } from '../../shared/models/ivideo-content';
import { ImgPipe } from "../../shared/pipe/img.pipe";
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DescriptionPipe } from '../../shared/pipe/description.pipe';
@Component({
    selector: 'app-fav',
    standalone: true,
    templateUrl: './fav.component.html',
    styleUrl: './fav.component.scss',
    imports: [NgFor, NgIf, DescriptionPipe,ImgPipe,HeaderComponent,RouterModule,FooterComponent,MatProgressSpinnerModule,MatCardModule, MatButtonModule]
})
export class FavComponent implements OnInit {
  isLoading: boolean = false;
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
