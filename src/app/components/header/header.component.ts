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
  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name
  profileImage=JSON.parse(sessionStorage.getItem('loggedInUser')!).picture
    isSmallScreen: boolean = false;
nameLetters: any[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }
//

ngOnInit(): void {
  this.nameLetters = this.splitName();
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
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
