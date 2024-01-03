import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthUserRequest } from 'src/app/shared/interfaces/auth/authUserRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    RouterModule,
  ],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}

  loginForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9.+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.min(6), Validators.maxLength(6)],
    ],
  });

  ngOnInit() {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as AuthUserRequest)
        .subscribe({
          next: (response) => {
            this.cookieService.set('USER_INFO', response.token);
            this.loginForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo(a) !!`,
              life: 2500,
            });
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao fazer login!`,
              life: 2500,
            });
          },
        });
    }
  }
}
