import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public signupForm: any;
  emailChanged: Boolean = false;
  passwordChanged: Boolean = false;
  submitAttempt: Boolean = false;


  constructor(
    private router: Router,
    public authData: AuthService,
    public formBuilder: FormBuilder,
    public alertController: AlertController
    ) {
    this.authData = authData;


    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input) {
    const field = input.inputControl.name;
    this[field + 'Changed'] = true;
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel.');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  signupUser(event) {
    event.preventDefault();

    this.submitAttempt = true;

    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);

    } else {

      this.authData.signupUser(
        this.signupForm.value.email,
        this.signupForm.value.password
      )
      .then(
        (newUser: any) => {
          console.log(newUser);

          this.presentAlertConfirm('User Registered');
          this.goToLogin();
        }
      )
      .catch(
        (error: any) => {
          if (error) {
            console.log('Error:' + error.code);
          }
        }
      );
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
