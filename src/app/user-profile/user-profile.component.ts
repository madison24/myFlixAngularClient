import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

/**
 * @description component for user profile
 * @selector 'app-user-profile'
 * @templateURL './user-profile.component.html'
 * @styleURL './user-profile.component.scss',
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };
  user: any = {};

  FavoriteMovies: any[] = [];

  /**
   * @constructor - constructor for UserProfileComponent
   * @param fetchApiData - fetch data from api
   * @param snackBar - material snack bar service for displaying notifications/alerts
   * @param router - router service for navigation
   * @param {MatDialog} dialog - material dialog service for opening dialogs
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Function to get users info
   * local storage will give username + token and send request to api for users info
   * User profile will display users favorite movies along with name, birthday, etc.
   * @return user's data
   */

  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.userData.Birthday = formatDate(
        this.user.Birthday,
        'yyyy-MM-dd',
        'en-US',
        'UTC-5'
      );

      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.FavoriteMovies = response.filter(
          (movie: { _id: any }) =>
            this.user.FavoriteMovies.indexOf(movie._id) >= 0
        );
      });
    });
  }

  /**
   * Function updates users data
   * @return user data
   * @return user updated data thats saved to local storage
   * @return notification of successful update
   * @return or notification of error
   */

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        console.log('successfully updated', result);
        localStorage.setItem('user', JSON.stringify(result));
        this.snackBar.open('Profile has been successfully updated', 'OK', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error updating user:', error);
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Function deletes user profile
   * @return confirm delete profile prompt
   * @return user's profile has been deleted
   * @return navigates to welcome page
   * @return notifies user of success or error
   * @return user details and token removed from local storage
   */

  deleteUserProfile(): void {
    if (confirm('Do you want to delete your profile permanently?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your profile has been deleted', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
        console.log(result);
      });
    }
  }
}
