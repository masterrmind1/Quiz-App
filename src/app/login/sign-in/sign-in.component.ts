import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from 'inspector';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm;
  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  login(): any{
    if (this.loginForm.valid){
      if (localStorage.getItem(this.loginForm.value.email)){
        const pass = JSON.parse(localStorage.getItem(this.loginForm.value.email));
        if (pass.password === this.loginForm.value.password){
          this.toastr.success('Login SuccessFully Done', 'Success');
          sessionStorage.setItem('current-user', this.loginForm.value.email);
          this.router.navigate(['/home']);
        }else{
          this.toastr.error('Wrong Password', 'Error' );
        }
      }else{
        this.toastr.error('User Not Registered', 'Error' );
      }
    }else{
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please Fill all Data correctly', 'Error' );
    }
  }

  goToSignUp(): any{
    this.router.navigate(['/login/sign-up']);
  }

}
