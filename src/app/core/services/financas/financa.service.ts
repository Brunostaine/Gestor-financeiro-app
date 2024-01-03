import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { CreateFinancaRequest } from 'src/app/shared/interfaces/financas/request/createFinancaRequest';
import { CreateFinancaResponse } from 'src/app/shared/interfaces/financas/response/createFinancaResponse';
import { GetAllFinancasResponse } from 'src/app/shared/interfaces/financas/response/getAllFinancasResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FinancaService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      // Token pelo interceptor
      'Content-Type': 'application/',
      // Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllfinancas(): Observable<Array<GetAllFinancasResponse>> {
    return this.http
      .get<Array<GetAllFinancasResponse>>(
        `
    ${this.API_URL}/financas`,
        this.httpOptions
      )
      .pipe(map((response: any) => response.content));
  }

  createFinanca(
    requests: CreateFinancaRequest
  ): Observable<CreateFinancaResponse> {
    return this.http.post<CreateFinancaResponse>(
      `${this.API_URL}/financa`,
      requests,
      this.httpOptions
    );
  }

  deleteFinanca(financa_id: string): Observable<any> {
    const url = `${this.API_URL}/financas/${financa_id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
