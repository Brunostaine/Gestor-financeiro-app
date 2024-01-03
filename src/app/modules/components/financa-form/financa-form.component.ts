import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';
import { FinancaService } from 'src/app/core/services/financa/financa.service';
import { Categorias } from 'src/app/shared/enums/categorias/categorias';
import { CreateFinancaRequest } from 'src/app/shared/models/interfaces/financas/request/createFinancaRequest';

@Component({
  selector: 'app-financa-form',
  templateUrl: './financa-form.component.html',
  styleUrls: ['./financa-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class FinancaFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public categorias: Array<Categorias> = [];

  addFinancaForm = this.fb.group({
    tipo: ['', Validators.required],
    valor: [0, Validators.required],
    categoria: ['', Validators.required],
    descricao: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private financaService: FinancaService
  ) {}

  ngOnInit() {}

  handleSubmitAddFinanca(): void {
    const requestCreateFinanca: CreateFinancaRequest = {
      tipo: this.addFinancaForm.value.tipo as string,
      valor: Number(this.addFinancaForm.value.valor as number),
      categoria: this.addFinancaForm.value.categoria as Categorias,
      descricao: this.addFinancaForm.value.descricao as string
    }

    this.financaService.createFinanca(requestCreateFinanca)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response);

        },error: (err) =>{
          console.log(err);

        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
