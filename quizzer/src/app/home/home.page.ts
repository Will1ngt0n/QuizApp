import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  logo
  constructor(public userService : UserService) {
    this.logo = "assets\\images\\quizzer.jpg"
  }

}
