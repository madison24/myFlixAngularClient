import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component with navigation bar
 * @selector 'app-navbar'
 * @templateURL './navbar.component.html'
 * @styleURL './navbar.component.scss',
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  /**
   * @constructor - Constructor for navbar component
   * @param fetchApiData - fetch data from api
   * @param router - router service for navigation
   * @param {MatSnackBar} snackBar - Material snack bar for notifications
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Navigation bar for navigating movies
   */
  navMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigation bar for navigating user profile
   */
  navProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out user
   * @returns user + token removed from local storage
   * @returns user is navigated to welcome page after successful logout
   */

  navLogoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
    this.snackBar.open('User has been logged out', 'OK', {
      duration: 3000,
    });
  }
}
