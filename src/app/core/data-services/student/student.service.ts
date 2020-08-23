import { CONFIG } from './../../../config/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiPath = `${CONFIG.apiPath}/students`;

  constructor(private readonly http: HttpClient) {}

  public getStudents(): Observable<any> {
    return this.http
      .get(`${this.apiPath}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getStudent(studentId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${studentId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}