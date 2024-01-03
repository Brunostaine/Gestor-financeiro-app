import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private cookie: CookieService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let JWT_TOKEN = this.cookie.get('USER_INFO');
    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + JWT_TOKEN),
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 0) {
          this.userService.logout();
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Usuário não autorizado ou token expirado!',
            life: 2500
          })
          this.router.navigate(['/login']);

        }
        return throwError(() => new Error('Token expirado ou inválido: ' + error))
      })
    );
  }
}
