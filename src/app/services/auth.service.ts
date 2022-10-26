import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IuserLogin } from '../interface/iuser-login';
import { JsonPipe } from '@angular/common';
import { Iuser } from '../interface/iuser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserModelLogin: IuserLogin = {} as IuserLogin;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred : ', error.error)
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  login(username: string, password: string): Observable<any> {

    this.UserModelLogin = {
      username: username,
      password: password
    }                 // 
    return this.http.post(
      environment.BasicURL + 'api/auth/signin',
      JSON.stringify(this.UserModelLogin),
      httpOptions
     )
    .pipe(
       retry(2),
       catchError(this.handleError)
     );
  }

  register(username: string, email: string, password: string , roles :string): Observable<any> {

    const roleslist = [roles]
    return this.http.post(
      environment.BasicURL + 'api/auth/signup',
      {
        username,
        email,
        password,
        roleslist
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(environment.BasicURL + 'signout', {}, httpOptions);
  }

  // TestCallAPI(): Observable<any> {
  //   return this.http.get(environment.BasicURL + 'product');
  // }


}
