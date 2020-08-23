import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmailAvailableService {

  private apiPath = `${CONFIG.apiPath}/isAvailableEmail`;
  constructor(private readonly http: HttpClient) {}


  public isValidEmail(email:string ): Observable<any> {
    let params: HttpParams = new HttpParams();
    params.set('email', email);
    return this.http
      .get(`${this.apiPath}`,{params:params})
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  
}
