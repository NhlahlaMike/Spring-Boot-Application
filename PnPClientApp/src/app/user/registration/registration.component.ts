import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
          this.service.formModel.reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registration failed'
        });
        console.log(error);
      }
    );
  }

}
