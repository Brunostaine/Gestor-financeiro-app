import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FinancaEvent } from 'src/app/shared/enums/financas/financaEvent';
import { DeleteFinancaAction } from 'src/app/shared/interfaces/financas/event/deleteFinancaAction';
import { EventAction } from 'src/app/shared/interfaces/financas/event/eventAction';
import { GetAllFinancasResponse } from 'src/app/shared/interfaces/financas/response/getAllFinancasResponse';

@Component({
  selector: 'app-financa-table',
  templateUrl: './financa-table.component.html',
  styleUrls: ['./financa-table.component.css'],
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, TooltipModule],
})
export class FinancaTableComponent implements OnInit {
  @Input() financas: Array<GetAllFinancasResponse> = [];
  @Output() financaEvent = new EventEmitter<EventAction>();
  @Output() deleteFinancaEvent = new EventEmitter<DeleteFinancaAction>();

  public financeSelected!: GetAllFinancasResponse;
  public addFinancaEvent = FinancaEvent.ADD_FINANCA_EVENT;
  public editFinancaEvent = FinancaEvent.EDIT_FINANCA_EVENT;

  constructor() {}

  ngOnInit() {}

  handleFinancaEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const financaEvent = id && id !== '' ? { action, id } : { action };

      this.financaEvent.emit(financaEvent);
    }
  }

  handleDeleteFinanca(financa_id: string, financaDescription: string): void {
    if (financa_id && financaDescription) {
      this.deleteFinancaEvent.emit({ financa_id, financaDescription });
    }
  }
}
