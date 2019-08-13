import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string
  password: string
  constructor(public userService: UserService, public alertController: AlertController) { }
  login(){
    this.userService.login(this.username, this.password)
  }

  //Resetting user password using email password reset request
  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Placeholder 1'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (user) => {
            console.log('Confirm Okay');
            this.userService.passwordReset(user.email)
          }
        }
      ]
    });

    await alert.present();
  }
  ngOnInit() {
  }

}
