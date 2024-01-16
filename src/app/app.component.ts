import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { BrowseComponent } from './pages/browse/browse.component';
import { LoginComponent } from '../app/pages/login/login.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, HeaderComponent,BrowseComponent,LoginComponent]
})
export class AppComponent {
  title = 'Netflix';

}
