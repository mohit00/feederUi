import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyweeklyReportComponent } from './supplyweekly-report.component';

describe('SupplyweeklyReportComponent', () => {
  let component: SupplyweeklyReportComponent;
  let fixture: ComponentFixture<SupplyweeklyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyweeklyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyweeklyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
