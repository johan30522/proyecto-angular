import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Department } from '../../../shared/models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private apiPath = `${CONFIG.apiPath}/departments`;

  constructor(private readonly http: HttpClient) {}

  public getDeptos(): Observable<any> {
    return this.http
      .get(`${this.apiPath}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getDepto(deptoId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${deptoId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public createDepartment(body: Department ): Observable<any> {
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public editDepartment(body: Department ): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${body.id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public deletDepartment(deptoId: number): Observable<any> {
    return this.http
      .delete(`${this.apiPath}/${deptoId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
