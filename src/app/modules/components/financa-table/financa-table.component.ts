import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { GetAllFinancasResponse } from 'src/app/shared/models/interfaces/financas/response/getAllFinancasResponse';

@Component({
  selector: 'app-financa-table',
  templateUrl: './financa-table.component.html',
  styleUrls: ['./financa-table.component.css'],
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, TooltipModule],
})
export class FinancaTableComponent implements OnInit {
  @Input() financas: Array<GetAllFinancasResponse> = [];

  public financeSelected!: GetAllFinancasResponse;

  constructor() {}

  ngOnInit() {}
}
