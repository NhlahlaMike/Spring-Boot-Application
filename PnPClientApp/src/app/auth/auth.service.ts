import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../_interfaces/login-form';
import { Registration } from '../_interfaces/registration';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
}
