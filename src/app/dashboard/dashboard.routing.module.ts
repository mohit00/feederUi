import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SupplyReportComponent } from '../supply-report/supply-report.component';

import { SupplyweeklyReportComponent } from '../supplyweekly-report/supplyweekly-report.component';
import { SupplythreeReportComponent } from '../supplythree-report/supplythree-report.component';

const routes: Routes = [
  
{
  path:'',
  component: DashboardComponent
},{
  path:'Supply/Daily/Report',
  component:SupplyReportComponent
},{
  path:'Supply/Weekly/Report',
  component: SupplythreeReportComponent 
},{
  path:'Supply/Three/Day/Report',
  component:SupplyweeklyReportComponent
}
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
