import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
{
  path:'Login',
  component:LoginComponent
}
  ,{ path: 'dashboard',
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },{
    path: '**',
    redirectTo: 'Login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
