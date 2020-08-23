import { Injectable } from '@angular/core';
import { CONFIG } from '../../../config/index';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Credentials } from '../../../shared/models/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private apiPath = `${CONFIG.apiPath}`;
  //private molinaPath = `${CONFIG.apiAuthPath}/JWT_Auth`;

  constructor(private readonly http: HttpClient) { }

  public login(credentials: Credentials): Observable<any> {
    console.log(credentials);
    return this.http
      .get(`${this.apiPath}/login`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public login2(credentials: Credentials): Observable<any> {
    console.log(credentials);
    /*const body = new HttpParams()
      .set('email', credentials.email)
      .set('password', credentials.password);

    return this.http.post(`${this.apiPath}/login`,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );*/


    return this.http
      .post(`${this.apiPath}/login`,credentials)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public logout(): Observable<any> {
    return this.http
      .post(`${this.apiPath}/logout`, {})
      .pipe(timeout(CONFIG.timeoutRequest));
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiPath}/forgotPassword`, {
      emailAddress: email,
    });
  }

}
