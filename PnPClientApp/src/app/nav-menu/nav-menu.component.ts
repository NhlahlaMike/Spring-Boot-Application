import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  LoginStatus$: Observable<boolean>;
  UserName$: Observable<string>;
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.LoginStatus$ = this.tokenStorage.isLoggesIn;
    this.UserName$ = this.tokenStorage.currentUserName;
    this.UserName$.subscribe(res => console.log(res));
  }

  onLogout() {
    this.tokenStorage.signOut();
  }

}
