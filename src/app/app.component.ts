import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from './shared/auth-state/auth-state.service';
import { TokenService } from './shared/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jukebox';

  isSignedIn!: boolean;
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) {}

  ngOnInit() {
    this.auth.setAuthState(false);
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    console.log(this.isSignedIn); 
    if(!this.isSignedIn){
      this.router.navigate(['login']);
    }
  }

  // Signout
  signOut() {
    sessionStorage.clear();
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}
