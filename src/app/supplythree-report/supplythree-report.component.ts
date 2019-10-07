import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { speedDialFabAnimations } from '../animation';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeederService} from '../service/feeder/feeder.service'
import { DatePipe } from '@angular/common';
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
  selector: 'app-supplythree-report',
  templateUrl: './supplythree-report.component.html',
  styleUrls: ['./supplythree-report.component.scss'],
  animations: speedDialFabAnimations

})
export class SupplythreeReportComponent  {
  maxDate:Date = new Date();
  authForm: FormGroup;
  HeaderKey :any ;
  pipe = new DatePipe('en-US');
  keyData:any;
  showData:boolean = false
  datachange(check){
    
    if(check == '1'){
       if(this.authForm.value.discom_id != 'All'){
        

    if(this.authForm.value.reportType == 'DISCOM'){
      this.authForm = this.fb.group({
        'discom_id': ['All', Validators.required ],
        'project_id': [this.authForm.value.project_id, Validators.required ],
        'date': [this.authForm.value.date, Validators.required ],
        'reportType':['', Validators.required ],
  
      });
 
    }
       
      }
    }
    
     if(this.authForm.valid){
       this.getSupplyDaily();
    }else{
      this.showData = false;
    }
   
  }
  reportTitle:any;
  displayList:any
  getSupplyDaily(){
       this.name ='TownName';
    this.Service.getDailySupply(this.authForm.value).subscribe(res=>{
      this.displayList = res[0].resources;
    })
  }
  constructor(private Router:Router,private fb: FormBuilder,private Service:FeederService) {
    this.authForm = this.fb.group({
      'discom_id': ['All', Validators.required ],
      'project_id': ['', Validators.required ],
      'date': ['', Validators.required ],
      'reportType':['', Validators.required ],

    });

   }
  changePage(data){
     
    this.Router.navigate([data])
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
  }
}
