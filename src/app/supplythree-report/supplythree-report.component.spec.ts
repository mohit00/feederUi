import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplythreeReportComponent } from './supplythree-report.component';

describe('SupplythreeReportComponent', () => {
  let component: SupplythreeReportComponent;
  let fixture: ComponentFixture<SupplythreeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplythreeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplythreeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
