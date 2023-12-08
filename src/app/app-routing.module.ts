import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { HomeComponent } from './components/home/home.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SongsViewComponent } from './components/songs/songs-view/songs-view.component';
import { SongsComponent } from './components/songs/songs.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './shared/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent},
  { path: 'register', component: SignupComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: UserProfileComponent  , canActivate: [AuthGuard]},
  { path: 'songs', component: SongsComponent , canActivate: [AuthGuard]},
  { path: 'song/:id', component: SongsViewComponent  , canActivate: [AuthGuard]},
  { path: 'genres', component: GenresComponent , canActivate: [AuthGuard]},
  { path: 'playlist/:id', component: PlaylistsComponent  , canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}