import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from 'src/app/core/services/user/user.service';
import { SignupUserRequest } from 'src/app/shared/interfaces/user/signupUserRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RegisterComponent,
    RouterModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  signupForm = this.fb.group({
    nome: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {}

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            this.signupForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Usuário cadastrado com sucesso!`,
              life: 2500,
            });
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao cadastrar usuário`,
              life: 2500,
            });
            this.signupForm.reset();
            console.log(err);
          },
        });
    }
  }
}
