import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private apiPath = `${CONFIG.apiUploadFile}/upload/usuario`;
  //private apiPath = 'http://localhost:3001/upload/usuario';
  constructor(private readonly http: HttpClient) { }

  public uploadUserCV(body: FormData ,id:number): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
