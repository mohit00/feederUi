import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { speedDialFabAnimations } from '../animation';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeederService} from '../service/feeder/feeder.service'
import { DatePipe } from '@angular/common';
 import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as XLSX from 'xlsx';  

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment} from 'moment';

const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/** @title Datepicker emulating a Year and month picker */

export interface FabButton {
  icon: string,
  tooltip: string
}
export enum SpeedDialFabPosition {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right'
}
@Component({
  selector: 'app-supplyweekly-report',
  templateUrl: './supplyweekly-report.component.html',
  styleUrls: ['./supplyweekly-report.component.scss'],
  animations: speedDialFabAnimations,  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],


})
export class SupplyweeklyReportComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb,  this.reportTitle+'.xlsx');  
  }  
   maxDate:Date = new Date();
  authForm: FormGroup;
  HeaderKey :any ;
  pipe = new DatePipe('en-US');
  keyData:any;
  showData:boolean = false
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.authForm.value.date;
     
    ctrlValue.year(normalizedYear.year());
 
    this.authForm.patchValue({
      
      date: ctrlValue
     });  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    datepicker.close();
this.datachange();
    const ctrlValue = this.authForm.value.date;
    ctrlValue.month(normalizedMonth.month());
    setTimeout(()=>{
      this.authForm.patchValue({
      
        date: ctrlValue
       }); 
    },100)
   
    
     
  }

  reportTitle:any;
  displayList:any = [];
  datachange( ){
    
     
    
     if(this.authForm.valid){
       this.getSupplyDaily();
    }else{
      this.showData = false;
    }
   
  }
  getSupplyDaily(){
    this.displayList = [];
       this.name ='TownName';
       
    this.Service.getWeeklySupply(this.authForm.value).subscribe(res=>{
      console.log(JSON.stringify(res))
      this.displayList = res[0].resources;
    })
  }
  constructor(private Router:Router,private fb: FormBuilder,private Service:FeederService) {
    this.authForm = this.fb.group({
      'discom_id': ['All', Validators.required ],
      'project_id': ['', Validators.required ],
      'reportType':['', Validators.required ],
      'limit':['', Validators.required ],
      date:[moment(),Validators.required]

    });

   }

  ngOnInit() {
  }

  name = '';

  private speedDialFabButtons = [
    {
      icon: 'picture_as_pdf',
      tooltip: 'Download PDF'
    },{
      icon: 'assignment',
      tooltip: 'Download Excel'
    },
    {
      icon: 'timeline',
      tooltip: 'Graphical Representation'
    } 
     
     
  ];

  SpeedDialFabPosition = SpeedDialFabPosition;
  speedDialFabColumnDirection = 'column';
  speedDialFabPosition = SpeedDialFabPosition.Top;
  speedDialFabPositionClassName = 'speed-dial-container-top';

  onPositionChange(position: SpeedDialFabPosition) {
    switch(position) {
      case SpeedDialFabPosition.Bottom:
        this.speedDialFabPositionClassName = 'speed-dial-container-bottom';
        this.speedDialFabColumnDirection = 'column-reverse';
        break;
      default:
        this.speedDialFabPositionClassName = 'speed-dial-container-top';
        this.speedDialFabColumnDirection = 'column';
    }
  }

  onSpeedDialFabClicked(btn: {icon: string}) {
    console.log(btn);
    if( btn.icon == 'assignment'){
      this.ExportTOExcel()
    }
  }
}
