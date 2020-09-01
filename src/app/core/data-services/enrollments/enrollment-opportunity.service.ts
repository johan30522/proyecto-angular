import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentOpportunityService {

  private apiPath = `${CONFIG.apiPath}/enrollmentOpportunity`;
  constructor(private readonly http: HttpClient) {

   }

   public getEnrollmentOpp(oppId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${oppId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
