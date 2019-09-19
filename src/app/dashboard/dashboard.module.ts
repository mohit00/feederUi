import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { DashRoutingModule } from './dashboard.routing.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [DashboardComponent,HeaderComponent],
  imports: [
    CommonModule,DashRoutingModule,   CollapseModule.forRoot()
  ]
})
export class DashboardModule { }
