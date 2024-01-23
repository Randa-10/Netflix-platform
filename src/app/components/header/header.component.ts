import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { DescriptionPipe } from '../../shared/pipe/description.pipe';
import { RouterModule } from '@angular/router';
import { FavService } from '../../shared/services/fav.service';
import { Subscription } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSelectModule } from '@angular/material/select';
import {  TranslateModule, TranslateService } from '@ngx-translate/core';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'../assets/i18n','.json')
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,NgIf,MatIconModule,MatToolbarModule,RouterModule,MatBadgeModule,TranslateModule],
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
  isSmallScreen: boolean = false;
  nameLetters: any[] = [];
  myListCount!: number;
  private myListCountSubscription!: Subscription;

  constructor(private breakpointObserver: BreakpointObserver,private myListService: FavService
     ,private TranslateService:TranslateService) {
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
  const name = this.name.split(' ')[0];
  const letters = name.split('');
    return letters.map((letter:string, index: number) => ({
    value: letter,
    animationDelay: index * 0.5 + 's',
  }));
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
    localStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }

///
toggleLanguageAndDirection(): void {
  const newLang = this.TranslateService.currentLang === 'en' ? 'ar' : 'en';

  const direction = newLang === 'ar' ? 'rtl' : 'ltr';

  this.TranslateService.use(newLang);
  document.documentElement.setAttribute('dir', direction);
}
///
}
