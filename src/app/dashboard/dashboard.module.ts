import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { DashRoutingModule } from './dashboard.routing.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HeaderComponent } from '../header/header.component';
import { AgmCoreModule } from '@agm/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HighchartsChartModule } from 'highcharts-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [DashboardComponent,HeaderComponent],
  imports: [MatMenuModule,AgmCoreModule.forRoot({
    apiKey: ''
  }),FormsModule,
    CommonModule,    BsDatepickerModule.forRoot() ,DashRoutingModule,BsDropdownModule ,   CollapseModule.forRoot(),HighchartsChartModule
  ]
})
export class DashboardModule { }
