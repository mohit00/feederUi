import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import {HttpClientModule}  from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { SucessComponent } from './dialog/sucess/sucess.component';
import { BsDropdownModule  } from 'ngx-bootstrap/dropdown';
import {ModalModule } from 'ngx-bootstrap'; 
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogComponent} from './dashboard/dialog/dialog'
import {MatFormFieldModule,MatInputModule ,MatSelectModule,MatDatepickerModule,
  MatNativeDateModule ,MatIconModule ,MatButtonToggleModule, MatTooltipModule,MatProgressSpinnerModule} from '@angular/material';
  import { FormsModule } from '@angular/forms';
 import {SharedModule} from './shared.module'
 @NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SucessComponent, DialogComponent
      
  ],entryComponents:[DialogComponent],
  imports: [SharedModule,MatFormFieldModule,MatInputModule ,MatSelectModule,MatDatepickerModule,
    MatNativeDateModule ,MatIconModule ,MatButtonToggleModule, MatTooltipModule,MatProgressSpinnerModule,MatDialogModule,BrowserAnimationsModule, HttpClientModule,MatMenuModule,
    BrowserModule,ReactiveFormsModule,FormsModule,BsDropdownModule.forRoot(),ModalModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
