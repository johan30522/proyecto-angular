import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Job } from '../../../shared/models/jobs.model';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiPath = `${CONFIG.apiPath}/jobs`;

  constructor(private readonly http: HttpClient) {}

  public getJobs(): Observable<any> {
    return this.http
      .get(`${this.apiPath}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getJob(jobId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${jobId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public createJob(body: Job ): Observable<any> {
    
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public editJob(body: Job ): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${body.id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public deleteJob(jobId: number): Observable<any> {
    return this.http
      .delete(`${this.apiPath}/${jobId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
