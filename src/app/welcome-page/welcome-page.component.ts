import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @description component for welcome page
 * @selector 'app-welcome-page'
 * @templateURL './welcome-page.component.html'
 * @styleURL './welcome-page.component.scss',
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * @constructor
   * @param {MatDialog} dialog material dialog service for opeing dialogs
   */

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Function will open the dialog when the Signup button is clicked
   * @returns dialog with the UserRegistrationFormComponent
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Function will open the dialog when the Login button is clicked
   * @returns dialog with the UserLoginFormComponent
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
