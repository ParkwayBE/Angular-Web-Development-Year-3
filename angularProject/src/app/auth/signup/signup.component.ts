import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AbstractControl, AsyncValidatorFn, FormControl, NgForm, ValidationErrors } from '@angular/forms';
import {  fetchSignInMethodsForEmail } from 'firebase/auth';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { passwordPrefixValidator } from '../password-prefix.validator';
import { Observable } from 'rxjs';
import { emailAvailableValidator } from '../email-check.validator';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private afa: AngularFireAuth){ 
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email],[emailAvailableValidator(this.afa)],],
      password: ['', [Validators.required, passwordPrefixValidator()]],
    })
  }

  onSignup(){
    if (this.signUpForm.valid) {
    const email =  this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    this.authService.signup(email, password)
    .then((res) =>{
      if(res == 'success'){
        this.router.navigate(['login']);
      } else {
        alert(res);
      }
    })}
    else{
      console.log("Invalid");
    }
  }

  
  
}

