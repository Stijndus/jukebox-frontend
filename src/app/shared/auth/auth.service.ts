import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  register(user: User): Observable<any> {
    return this.http.post('https://jukebox-backend-v2-05c77ef4e46e.herokuapp.com/api/auth/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('https://jukebox-backend-v2-05c77ef4e46e.herokuapp.com/api/auth/login', user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('https://jukebox-backend-v2-05c77ef4e46e.herokuapp.com/api/auth/user-profile');
  }
}
