import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * @constructor
   * @param {HttpClient} http for making Http requests
   */

  constructor(private http: HttpClient) {}

  /**
   * Api call for the user registration endpoint
   * @param {any} userDetails - userDetails for registration
   * @returns {Observable{any}} - Observable for API response
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Api call for user login endpoint
   * @param {any} userDetails - userDetails for login
   * @returns {Observable{any}} - Observable for API response
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Api call for Get All Movies endpoint
   * @returns {Observable{any}} - Observable for API response
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Api call for Get One Movie endpoint
   * @param {string} Title - title of one movie
   * @returns {Observable{any}} - Observable for API response
   */
  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + Title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Api call for Get One Director endpoint
   * @param {string} directorName - director of movies
   * @returns {Observable{any}} - Observable for API response
   */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Api call for Get One Genre endpoint
   * @param {string} genreName - genre of movies
   * @returns {Observable{any}} - Observable for API response
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Api call for Get One User endpoint
   * @returns {Observable{any}} - Observable for API response
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .get(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Api call for Get Favorite Movies for a User endpoint
   * @param {string} Username - Username of user
   * @returns {Observable{any}} - Observable for API response
   */
  getFavoriteMovies(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * Api call for Add a Movie to Favorite Movies for User endpoint
   * @param {string} movieId - movieID of movie to add to favorites
   * @returns {Observable{any}} - Observable for API response
   */
  addFavoriteMovies(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Previous favorites: ', user.FavoriteMovies);
    user.FavoriteMovies.push(movieId);
    console.log('New favorite movies: ', user.FavoriteMovies);
    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .post(
        apiUrl + 'users/' + user.Username + '/movies/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Api call for Edit User endpoint
   * @param {any} userDetails - userDetails of user to edit
   * @returns {Observable{any}} - Observable for API response
   */
  editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + userDetails.Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Api call for Delete user endpoint
   * @returns {Observable{any}} - Observable for API response
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        responseType: 'text',
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + '' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Api call for Delete a Movie from Favorite Movies for User endpoint
   * @param {string} movieId - movieID of movie to delete from favorites
   * @returns {Observable{any}} - Observable for API response
   */

  deleteFavoriteMovies(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const index = user.FavoriteMovies.indexOf(movieId);
    if (index > -1) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .delete(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Non-typed response extraction
   * @param {Object} res - API response
   * @returns {any} - extracted response data
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * handle HTTP errors
   * @param {HttpErrorResponse} error - http error response
   * @returns {any} - error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else if (error.error.errors) {
      return throwError(() => new Error(error.error.errors[0].msg));
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
