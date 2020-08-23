import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserAvailableService {

  private apiPath = `${CONFIG.apiPath}/isAvailableUsername`;
  constructor(private readonly http: HttpClient) {}


  public isValidUsername(username:string ): Observable<any> {
    let params: HttpParams = new HttpParams();
    return this.http
      .get(`${this.apiPath}`,{params:params})
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  
}
