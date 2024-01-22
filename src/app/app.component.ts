import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { BrowseComponent } from './pages/browse/browse.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FavComponent } from './components/fav/fav.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'../assets/i18n','.json')
}

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent,
       HeaderComponent,BrowseComponent,LoginComponent,RegisterComponent,FavComponent,
    TranslateModule ]
})
export class AppComponent implements OnInit {
   title = 'Netflix';
constructor(private TranslateService:TranslateService){
  }
  ngOnInit(): void {
        const userlang=navigator.language || 'en'
  const lang=userlang.split('-')[0]
  this.TranslateService.setDefaultLang(lang)
  this.TranslateService.use(lang)
}
toggleLanguageAndDirection(): void {
  // Toggle between English (en) and Arabic (ar)
  const newLang = this.TranslateService.currentLang === 'en' ? 'ar' : 'en';

  // Toggle between LTR and RTL based on the language
  const direction = newLang === 'ar' ? 'rtl' : 'ltr';

  this.TranslateService.use(newLang);
  document.documentElement.setAttribute('dir', direction);
}
}

