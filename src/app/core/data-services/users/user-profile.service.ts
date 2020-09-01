import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/app/config';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { UserProfile } from '../../../shared/models/user.profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiPath = `${CONFIG.apiPath}/userProfile`;
  constructor(private readonly http: HttpClient) {}


  public getUserProfile(userId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${userId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public createUserProfile(body: UserProfile ): Observable<any> {
    
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public editUser(body: UserProfile ): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${body.id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }

}
