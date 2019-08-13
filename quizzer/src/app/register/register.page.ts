import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email
  password
  constructor(public userService : UserService) { }
  addUser(){
    this.userService.register(this.email, this.password)
  }
  ngOnInit() {
  }

}
