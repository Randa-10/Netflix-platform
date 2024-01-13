import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
// import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { MatCommonModule } from '@angular/material/core';
// import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthServiceService } from '../../shared/services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,NgIf,MatIconModule,MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({required:true}) userImage :string =''
  auth=inject(AuthServiceService)
  navList = ["Home", "My List", "About", "Contact"];
  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name
  profileImage=JSON.parse(sessionStorage.getItem('loggedInUser')!).picture
    isSmallScreen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  toggleNavList() {
    this.isSmallScreen = !this.isSmallScreen;
    console.log('Toggling navigation list');
  }
  isOpen = false;
  isClose=false
  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.isClose=!this.isClose
  }

  signOut(){
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
