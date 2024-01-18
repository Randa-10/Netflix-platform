import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
// import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { MatCommonModule } from '@angular/material/core';
// import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { DescriptionPipe } from '../../shared/pipe/description.pipe';
import { RouterModule } from '@angular/router';
import { FavService } from '../../shared/services/fav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,NgIf,MatIconModule,MatToolbarModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
  ,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, 'letter-spacing': '10px' }),
        animate('5s ease-in', style({ opacity: 1, 'letter-spacing': '2px' })),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  @Input({required:true}) userImage :string =''
  auth=inject(AuthServiceService)
  navList = ["Home", "My List", "About", "Contact"];
  name = JSON.parse(localStorage.getItem('loggedInUser')!).name
  profileImage=JSON.parse(localStorage.getItem('loggedInUser')!).picture
  // profileImage="https://lh3.googleusercontent.com/a/ACg8ocLUQ4LXK4GNxw2C_LWyaRHoeikGzq-qt_yM4NOa0zMRrg=s96-c"
  // https://lh3.googleusercontent.com/a/ACg8ocLUQ4LXK4GNxw2C_LWyaRHoeikGzq-qt_yM4NOa0zMRrg=s96-c
   isSmallScreen: boolean = false;
nameLetters: any[] = [];
myListCount!: number;
private myListCountSubscription!: Subscription;

// constructor() {
// }

  constructor(private breakpointObserver: BreakpointObserver,private myListService: FavService) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });

  }
//

ngOnInit(): void {
  this.nameLetters = this.splitName();
  this.myListCountSubscription = this.myListService.myListCount$.subscribe((count: number) => {
    this.myListCount = count;
  });
}

ngOnDestroy(): void {
  this.myListCountSubscription.unsubscribe();
}


private splitName(): any[] {
  const name = this.name.split(' ')[0]; // Extract the first name
  const letters = name.split('');
    return letters.map((letter:string, index: number) => ({
    value: letter,
    animationDelay: index * 0.5 + 's',
  }));
}

//
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
    localStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
