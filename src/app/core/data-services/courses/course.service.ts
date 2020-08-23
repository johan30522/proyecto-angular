import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Course } from '../../../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiPath = `${CONFIG.apiPath}/courses`;

  constructor(private readonly http: HttpClient) {}

  public getCourses(): Observable<any> {
    return this.http
      .get(`${this.apiPath}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getCourse(courseId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${courseId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public createJob(body: Course ): Observable<any> {
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public editJob(body: Course ): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${body.id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
