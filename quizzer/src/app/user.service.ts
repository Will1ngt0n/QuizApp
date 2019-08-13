import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

var database = firebase.database();

@Injectable({
  providedIn: 'root'
})
export class UserService {
  categoriesLoop =[]
  rootRef = database.ref().child("Categories")
  constructor() { }


  
  login(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage)
    });
  }

  register(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // ...
    }).catch;
  }
  passwordReset(emailAddress){
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      console.log("Email has been sent")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }

}


 