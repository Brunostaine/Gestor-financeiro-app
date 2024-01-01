import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUserRequest } from 'src/app/shared/models/interfaces/auth/authUserRequest';
import { AuthUserResponse } from 'src/app/shared/models/interfaces/auth/authUserResponse';
import { SignupUserRequest } from 'src/app/shared/models/interfaces/user/signupUserRequest';
import { SignupUserResponse } from 'src/app/shared/models/interfaces/user/signupUserResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  signupUser(requests: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/usuarios`,
      requests,
      {headers: this.headers}
    );
  }

  authUser(requests: AuthUserRequest): Observable<AuthUserResponse> {
    return this.http.post<AuthUserResponse>(`${this.API_URL}/auth`, requests);
  }
}
