import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: any;
  emailChanged: Boolean = false;
  passwordChanged: Boolean = false;
  submitAttempt: Boolean = false;

  constructor(
    private router: Router,
    public authData: AuthService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.auth.authState.subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['/home']);
        }
      }
    );
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

  loginUser(event) {
    event.preventDefault();
    this.submitAttempt = true;

    if (!this.loginForm.valid) {
        console.log(this.loginForm.value);
      } else {

        this.authData
        .loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .then(
          (authData: any) => {
          this.router.navigate(['home']);
          }
        )
        .catch((error: any) => {
              if (error) {
                let customMessage = error.code;
                // You can catch here more errors
                switch (error.code) {
                  case 'auth/wrong-password':
                    customMessage = 'Wrong Password!';
                    break;
                  case 'auth/user-not-found':
                    customMessage = 'User not Found';
                    break;
                }
                this.presentAlertConfirm(customMessage);
              }
            });
      }
  }

  goToSignup() {
    this.router.navigate(['register']);
  }

  goToResetPassword() {
    this.router.navigate(['forgot']);
  }

}
