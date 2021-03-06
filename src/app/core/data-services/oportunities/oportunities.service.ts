import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Oportunity } from '../../../shared/models/oportunity';

@Injectable({
  providedIn: 'root'
})
export class OportunitiesService {


  private apiPath = `${CONFIG.apiPath}/Oportunities`;

  constructor(private readonly http: HttpClient) {}

  public getOportunities(): Observable<any> {
    return this.http
      .get(`${this.apiPath}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getOportunitiesByStatus(status:string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params.set('status', status);
    return this.http
      .get(`${this.apiPath}`,{params:params})
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getOportunity(OportunityId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${OportunityId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public createOportunity(body: Oportunity ): Observable<any> {
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public editOportunuity(body: Oportunity ): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${body.id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public deleteOportunity(oportunityId: number): Observable<any> {
    return this.http
      .delete(`${this.apiPath}/${oportunityId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public changeStatus(oportunityId: number, status: String): Observable<any> {
    return this.http
      .patch(`${this.apiPath}/${oportunityId}`, { status: status })
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
