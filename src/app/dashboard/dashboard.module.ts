import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
 
import {MatFormFieldModule,MatInputModule ,MatSelectModule,MatDatepickerModule,
  MatNativeDateModule ,MatIconModule ,MatButtonToggleModule, MatTooltipModule} from '@angular/material';

import {
  EcoFabSpeedDialModule
} from '@ecodev/fab-speed-dial';
import { DashRoutingModule } from './dashboard.routing.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HeaderComponent } from '../header/header.component';
import { AgmCoreModule } from '@agm/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HighchartsChartModule } from 'highcharts-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MaphilightModule } from 'ng-maphilight'
import { SupplyReportComponent } from '../supply-report/supply-report.component';
import { SupplyweeklyReportComponent } from '../supplyweekly-report/supplyweekly-report.component';
import { SupplythreeReportComponent } from '../supplythree-report/supplythree-report.component';
import { SpeedDialFabComponent } from '../speed-dial-fab/speed-dial-fab.component';
import { FilterNewPipe } from '../service/filter.pipe';

@NgModule({
  declarations: [FilterNewPipe,SupplyReportComponent,DashboardComponent,HeaderComponent, SupplyweeklyReportComponent, SupplythreeReportComponent, SpeedDialFabComponent],
  imports: [ReactiveFormsModule, MatButtonToggleModule, MatTooltipModule,MatMenuModule,MaphilightModule,MatInputModule,EcoFabSpeedDialModule,AgmCoreModule.forRoot({
    apiKey: ''
  }),FormsModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule ,MatIconModule,
    CommonModule, MatFormFieldModule,   BsDatepickerModule.forRoot() ,DashRoutingModule,BsDropdownModule ,   CollapseModule.forRoot(),HighchartsChartModule
  ]
})
export class DashboardModule { }
