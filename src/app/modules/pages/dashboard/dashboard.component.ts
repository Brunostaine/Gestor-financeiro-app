import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { FinancaService } from 'src/app/core/services/financas/financa.service';
import { EventAction } from 'src/app/shared/interfaces/financas/event/eventAction';
import { FinancaTableComponent } from '../../components/financa-table/financa-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DashboardComponent,
    FinancaTableComponent,
    ConfirmDialogModule,
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public financasData: any;

  constructor(
    private financaService: FinancaService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buscarFinancasAPI();
  }

  buscarFinancasAPI() {
    this.financaService
      .getAllfinancas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.financasData = response;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleFinancaAction(action: EventAction): void {
    console.log('evento recebido: ', action);
  }

  handleDeleteFinancaAction(event: {
    financa_id: string;
    financaDescription: string;
  }): void {
    this.confirmationService.confirm({
      message: `Confirma a excluisão da financa de descrição: ${event?.financaDescription}`,
      header: `Confirmação de exclusão`,
      icon: `pi pi-exclamation-triangle`,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.deleteFinanca(event?.financa_id),
    });
  }
  deleteFinanca(financa_id: string) {
    this.financaService
      .deleteFinanca(financa_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Finança deletada com sucesso.',
            life: 2500,
          });
          this.buscarFinancasAPI();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao deletar a finança.',
            life: 2500,
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
