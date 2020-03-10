import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

// add constant names
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: Array<string> = []; // private roles: string[] = [];
  jwtHelper = new JwtHelperService();
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName    = new BehaviorSubject<string>(this.getUsername());

constructor(private router: Router) { }

  signOut() {
    // localStorage.clear();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem('loginStatus', '0');
    this.loginStatus.next(false);
    this.router.navigate(['/home']);
  }

  setloginStatus(status: string) {
    localStorage.setItem('loginStatus', status);
  }

  // check if token is expired
  checkLoginStatus(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);   // return true if not expired and false if expired
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  public saveToken(token: string) {
    if (token != null) {
      this.loginStatus.next(true);
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    // this.currentUserName.subscribe(Uname => Uname = username);
    this.UserName.next(username);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
