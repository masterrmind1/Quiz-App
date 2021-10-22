import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm;
  matcher = new MyErrorStateMatcher();
  constructor(private toastr: ToastrService,  private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required),
    },  this.checkPasswords );
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirm').value;
    return pass === confirmPass ? null : { notSame: true };
  }


  signUp(): void{
    console.log(this.signUpForm);
    if (this.signUpForm.valid){
      if (localStorage.getItem(this.signUpForm.value.email)){
        this.toastr.error('Email already registered', 'Error' );
      }else{
        localStorage.setItem(this.signUpForm.value.email, JSON.stringify(this.signUpForm.value));
        this.toastr.success('User SuccessFully Registred', 'Success');
        this.router.navigate(['/sign-in']);
      }
    }else{
      this.signUpForm.markAllAsTouched();
      this.toastr.error('Please Fill all Data correctly', 'Error' );
    }
  }

  goToLogin(): any{
    this.router.navigate(['/login/sign-in']);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

