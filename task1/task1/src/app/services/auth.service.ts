import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid?: string

  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.uid = uid;
        console.log("User is logged in as", user.email);
      } else {
        this.uid = undefined;
        console.log("User logged Out.")
      }
    });

  }

  isAuthenticated(){
    return this.uid? true:false;
  }

  getUid(){
    return this.uid;
  }

  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log({ user });
        this.router.navigate(['/'])
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        alert("Something Went Wrong While Singup, Try Again!!!")
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log({ user })
        this.router.navigate(['/'])

      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        alert("Something Went Wrong While Login, Try Again!!!")
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      alert("Something Went Wrong While LogOut")
    });
  }
}
