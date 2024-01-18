import { FavComponent } from './components/fav/fav.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
   {path:'',loadComponent:() => import('./pages/login/login.component').then(a=>a.LoginComponent)},
   { path: 'home', loadComponent: () => import('./pages/browse/browse.component').then(a => a.BrowseComponent) },
   { path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(a => a.ProfileComponent) },
   {path:'details/:id',loadComponent:() => import('./components/movie-details/movie-details.component').then(a=>a.MovieDetailsComponent)},
   {path:'register',loadComponent:() => import('./pages/register/register.component').then(a=>a.RegisterComponent)},
   {path:'fav',loadComponent:() => import('./components/fav/fav.component').then(a=>a.FavComponent)},
   { path: 'home', component: FavComponent },
   { path: 'my-list', component: FavComponent },
   { path: 'about', component: FavComponent },
   { path: 'contact', component: FavComponent },
];
