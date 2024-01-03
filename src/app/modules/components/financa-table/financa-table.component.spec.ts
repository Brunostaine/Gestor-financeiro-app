/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FinancaTableComponent } from './financa-table.component';

describe('FinancaTableComponent', () => {
  let component: FinancaTableComponent;
  let fixture: ComponentFixture<FinancaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
