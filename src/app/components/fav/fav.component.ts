import { Component, OnInit } from '@angular/core';
import { FavService } from '../../shared/services/fav.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.scss'
})
export class FavComponent implements OnInit{
  favorites: string[] = [];
  selectedItem: string | null = null;

  constructor(private favService: FavService) {}

  ngOnInit(): void {
    this.favService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });

    // Subscribe to the selected item
    this.favService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    });
  }
}

