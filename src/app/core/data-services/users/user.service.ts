import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiPath = `${CONFIG.apiPath}/users`;
  constructor(private readonly http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http
      .get(`${this.apiPath}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getUser(userId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${userId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public isValidUsername(username:string ): Observable<any> {
    
    return this.http
      .get(`${this.apiPath}/isValidUser/${username}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public isValidEmail(email:string ): Observable<any> {
    return this.http
      .get(`${this.apiPath}/isvalidEmail/${email}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public createUser(body: User ): Observable<any> {
    
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public editUser(body: User ): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${body.id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public deleteUser(userId: number): Observable<any> {
    return this.http
      .delete(`${this.apiPath}/${userId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  
}
