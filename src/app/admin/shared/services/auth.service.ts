import { environment } from './../../../../environments/environment';
import { IFbAuthResponse, IUser } from './../../../shared/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()

export class AuthService {
  error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {}

  get token(): string {
    const expDate = new Date( localStorage.getItem('fb-token-exp') );

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  login(user: IUser): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError( this.handleError.bind(this) )
      )
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(err: HttpErrorResponse) {
    const {message} = err.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
    }

    // throwError(err);
  }

  private setToken(res: IFbAuthResponse | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + (+res.expiresIn) * 1000);

      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem( 'fb-token-exp', expDate.toString() );
    } else {
      localStorage.clear();
    }
  }
}