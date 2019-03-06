import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  public resetPasswordForm: any;
  emailChanged: Boolean = false;
  passwordChanged: Boolean = false;
  submitAttempt: Boolean = false;

  constructor(
    private authData: AuthService,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
    ) {}

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  resetPassword(event) {
    event.preventDefault();
    this.submitAttempt = true;

    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);

    } else {
    console.log(this.resetPasswordForm.value.email);

    this.authData.resetPassword(this.resetPasswordForm.value.email);
      const alert = this.presentAlertConfirm('Password reset link sent');
      this.goToLogin();
      }
  }

  async presentAlertConfirm(msg: string) {
    const
     alert = await this.alertController.create({
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

  goToLogin() {
    this.router.navigate(['login']);
  }
}
