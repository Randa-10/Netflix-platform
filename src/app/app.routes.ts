import { FavComponent } from './components/fav/fav.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { Routes } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse.component';

export const routes: Routes = [
   {path:'',loadComponent:() => import('./pages/login/login.component').then(a=>a.LoginComponent)},
   { path: 'home', loadComponent: () => import('./pages/browse/browse.component').then(a => a.BrowseComponent) },
   {path:'details/:id',loadComponent:() => import('./components/movie-details/movie-details.component').then(a=>a.MovieDetailsComponent)},
  //  {path:'register',loadComponent:() => import('./pages/register/register.component').then(a=>a.RegisterComponent)},
  //  {path:'fav',loadComponent:() => import('./components/fav/fav.component').then(a=>a.FavComponent)},
   { path: 'fav', component: FavComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'home', component: BrowseComponent },
   { path: 'my-list', component: FavComponent },
  //  { path: 'about', component: FavComponent },
  //  { path: 'contact', component: FavComponent },
];
