import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { FinancaService } from 'src/app/core/services/financas/financa.service';
import { FinancaTableComponent } from '../../components/financa-table/financa-table.component';
import { GetAllFinancasResponse } from '../../../shared/interfaces/financas/response/getAllFinancasResponse';
import { EventAction } from 'src/app/shared/interfaces/financas/event/eventAction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, DashboardComponent, FinancaTableComponent],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public financasData: any;

  constructor(
    private financaService: FinancaService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buscarFinancasAPI();
  }

  buscarFinancasAPI() {
    this.financaService
      .getAllfinancas()

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
