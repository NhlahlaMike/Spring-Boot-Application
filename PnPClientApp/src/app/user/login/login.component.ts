import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: string;
  loginForm: FormGroup;
  errorMessage = '';
  username: string;
  roles: string[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.validateLoginForm();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  validateLoginForm() {
    // validate form inputs
       this.loginForm = this.fb.group({
         username: ['', Validators.required],
         password: ['', Validators.required]
       });
     }

     login() {
      // const UserName = this.loginForm.value.UserName;
      // const Password = this.loginForm.value.Password;
      const user = this.loginForm.value;
      this.userService.login(user).subscribe(
        res => {
          if (res && res.accessToken) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You are successfully loggin!',
            showConfirmButton: false,
            timer: 1500
          });

          this.tokenStorage.saveToken(res.accessToken);
          this.tokenStorage.saveUsername(res.username);
          this.tokenStorage.saveAuthorities(res.authorities);

          this.tokenStorage.setloginStatus('1');
          this.username = this.tokenStorage.getUsername();
          this.roles = this.tokenStorage.getAuthorities();
          // this.reloadPage();
          this.router.navigate(['/home']);
         }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Login failed'
          });
          console.log(error);
        }
      );
     }

     reloadPage() {
      window.location.reload();
    }

}
