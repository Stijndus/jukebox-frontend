import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from './auth-state/auth-state.service';
import { AuthService } from './auth/auth.service';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isSignedIn: any;
  constructor(    private auth: AuthStateService,private tokenSrvc: TokenService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    if (!this.isSignedIn) {
      console.log(this.isSignedIn);
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
