import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyReportComponent } from './supply-report.component';

describe('SupplyReportComponent', () => {
  let component: SupplyReportComponent;
  let fixture: ComponentFixture<SupplyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
