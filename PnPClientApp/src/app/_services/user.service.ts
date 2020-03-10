import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Registration } from '../_interfaces/registration';
import { LoginForm } from '../_interfaces/login-form';
import { JwtResponse } from '../auth/jwt-response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl = environment.apiUrl;
  registrationInputs: Registration[];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  // user properties
  formModel = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    passwords: this.fb.group({
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });
  // this.loginstatus = false;
  comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('confirmPassword');
    // passwordMismatch
    // confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('password').value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }

  register(): Observable<string> {
    const body = {
      name: this.formModel.value.name,
      username: this.formModel.value.username,
      email: this.formModel.value.email,
      password: this.formModel.value.passwords.password,
      role: ['user'],
    };
    console.log(body);
    return this.http.post<string>(this.baseUrl + 'auth/signup', body, httpOptions);
  }

  login(loginForm: LoginForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.baseUrl + 'auth/signin', loginForm);
  }

}
