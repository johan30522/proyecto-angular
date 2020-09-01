import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Enroll_User } from '../../../shared/models/enrollment.user.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentUserService {
  private apiPath = `${CONFIG.apiPath}/enrollmentUser`;
  constructor(private readonly http: HttpClient) {

   }

   public getEnrollmentUser(userId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${userId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public createEnrollmentUser(body: Enroll_User ): Observable<any> {
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
