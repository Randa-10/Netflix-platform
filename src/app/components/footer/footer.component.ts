import { Component } from '@angular/core';
import {  TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSelectModule } from '@angular/material/select';


export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'../assets/i18n','.json')
}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private TranslateService:TranslateService){
  }

toggleLanguageAndDirection(): void {
  const newLang = this.TranslateService.currentLang === 'en' ? 'ar' : 'en';

  const direction = newLang === 'ar' ? 'rtl' : 'ltr';

  this.TranslateService.use(newLang);
  document.documentElement.setAttribute('dir', direction);
}

}
