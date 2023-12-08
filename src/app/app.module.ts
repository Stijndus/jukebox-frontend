import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { SongsComponent } from './components/songs/songs.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SongsGridComponent } from './components/songs/songs-grid/songs-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenresComponent } from './components/genres/genres.component';
import { BtnCellRenderer } from './shared/button-cell-renderer/button-cell-renderer.component';
import { SongsViewComponent } from './components/songs/songs-view/songs-view.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    HomeComponent,
    SongsComponent,
    PlaylistsComponent,
    SongsGridComponent,
    GenresComponent,
    BtnCellRenderer,
    SongsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([BtnCellRenderer]),
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    GridApi
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
