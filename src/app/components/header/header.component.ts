import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
// import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { MatCommonModule } from '@angular/material/core';
// import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,NgIf,MatIconModule,MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({required:true}) userImage :string =''
  // navList = ["Home", "Tv Shows", "News & Popular", "My List", "Browse by Language"];
  navList = ['Home', 'About', 'Contact'];
  // userImage = '/assets\pngwing.com.png';
  isSmallScreen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  toggleNavList() {
    this.isSmallScreen = !this.isSmallScreen;
    console.log('Toggling navigation list');
  }
}
