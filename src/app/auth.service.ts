import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) {}

  /**
   * Login an user
   *
   * @param {string} email  The email to use for user.
   * @param {string} password  The user password.
   * @returns the processed Promise.
   */
  loginUser(email: string, password: string): any {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Sign Up an user
   *
   * @param {string} email  The email to use for user.
   * @param {string} password  The user password.
   * @returns the processed Promise.
   */
  signupUser(email: string, password: string): any {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * Reset Password
   *
   * @param {string} email  The email to use for user.
   * @returns the processed Promise.
   */
  resetPassword(email: string): any {
    return this.fireAuth.auth.sendPasswordResetEmail(email);
  }

  /**
   * Logout User
   *
   * @returns the processed Promise.
   */
  logoutUser(): any {
  return this.fireAuth.auth.signOut();
  }
}