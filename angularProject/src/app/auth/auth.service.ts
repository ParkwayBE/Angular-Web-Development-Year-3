import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

interface UserData {
  username: string;
  // Define other fields as needed
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;
  isAdmin: boolean =false;
  constructor(private router: Router, private auth: Auth) {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }
   }

  signup(email: string, password: string): Promise<string>{
    return createUserWithEmailAndPassword(this.auth, email, password)
    .catch(error => {
      console.log(error);
      return error;
    })
    .then(() => {
      return 'success';
    });
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
    .then( () => {
      return this.auth.currentUser?.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          localStorage.setItem('token', token);
          return true;
        }
      );
    })
    .catch(
      error => {
        console.log(error);
        return false;
      }
    );
  }

  logout(): void{
    this.auth.signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean{
    return this.token != null;
  }

  isAdminLoggedIn(): boolean{
    this.auth.onAuthStateChanged((user) =>{
      if(user)
      {
        if(user.email == "likegforce@protonmail.com")
        {
          this.isAdmin = true;
          console.log(user.email)
        }
        else{
          this.isAdmin = false;
        }
      }
    })
    return this.isAdmin;
  }
  checkit(email:string){
    firebase.auth().fetchSignInMethodsForEmail(email)
    .then(function(signInMethods) {
      if (signInMethods.length > 0) {
      }
    })
  }
  
  
}
