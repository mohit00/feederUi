import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { speedDialFabAnimations } from '../animation';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeederService} from '../service/feeder/feeder.service'
import { DatePipe } from '@angular/common';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';  

pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  selector: 'app-supply-report',
  templateUrl: './supply-report.component.html',
  styleUrls: ['./supply-report.component.scss'],
  animations: speedDialFabAnimations

})

export class SupplyReportComponent implements OnInit {
  @ViewChild('to-pdf',{static:true}) element: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  

  maxDate:Date = new Date();
  authForm: FormGroup;
  HeaderKey :any ;
  pipe = new DatePipe('en-US');
  keyData:any;
  showData:boolean = false
    pdfHeader:any = [];
    ExportTOExcel() {  
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb,  this.reportTitle+'.xlsx');  
    }  
  
  createPdf(){
    var widths  = []
    if(this.authForm.value.reportType == 'DISCOM'){
      this.name = 'discom'
      this.keyData = ["","discom","count","supply_duration","OutageLessThan22Count","percentage","OutageLessThan22Durat"];
     this.pdfHeader = [
       {
         text: "SNo.", style: 'tableHeader'
        } 
       ,{
          text:"Discom Name",
        style: 'tableHeader'
      },{
        text:'Total No of Feeders	',
        style: 'tableHeader'

      },{
        text:'Average of actual supply duration',
        style: 'tableHeader'

      },{
        text:"No of feeders supply < 22 hrs",
        style: 'tableHeader'

      },{
        text:"%",
        style: 'tableHeader'

      },{
        text:"Avg Supply of feeders < 22 hrs",
        style: 'tableHeader'

      }
       
      ];
      var supperBody = [];
      supperBody.push(this.pdfHeader)
      for( var i =0 ;i<this.displayList.length ; i++){
        let body= [i+1,this.displayList[i].discom,
        this.displayList[i].count,
        this.displayList[i].supply_duration
        ,this.displayList[i].OutageLessThan22Count
        ,this.displayList[i].percentage
        ,this.displayList[i].OutageLessThan22Durat]
        supperBody.push(body)

      }
        
      this.reportTitle ="Discom Report"
    }else if(this.authForm.value.reportType == 'DISTRICT'){
      
      
       this.keyData = ["","discom","count","district", "supply_duration","OutageLessThan22Count","percentage","OutageLessThan22Durat"];
       this.reportTitle ="District Wise Report"
      this.name = 'discom'
      this.pdfHeader = [{
      text:"SNo.",
      style: 'tableHeader'
    },{
      text:"Discom Name",
      style: 'tableHeader'
    },{
      text:"Total No of Feeders	",
      style: 'tableHeader'
    },{
      text:"District",
      style: 'tableHeader'
    },{
      text:"Average of actual supply duration",
      style: 'tableHeader'
    },{
      text:"No of feeders supply < 22 hrs",
      style: 'tableHeader'
    },{
      text:"%",
      style: 'tableHeader'
    },{
      text:"Avg Supply of feeders < 22 hrs",
      style: 'tableHeader'
    }
       
      ];
      var supperBody = [];
      supperBody.push(this.pdfHeader)
      for( var i =0 ;i<this.displayList.length ; i++){
        let body= [i+1,this.displayList[i].discom,
        this.displayList[i].count,
        this.displayList[i].district,
        
        this.displayList[i].supply_duration
        ,this.displayList[i].OutageLessThan22Count
        ,this.displayList[i].percentage
        ,this.displayList[i].OutageLessThan22Durat]
        supperBody.push(body)

      }
        
     }if(this.authForm.value.reportType == 'TOWN'){
      
      
      this.name = 'town'
       this.pdfHeader = [{
        text:"SNo.",
        style: 'tableHeader'
      },{
        text:"Discom Name",
        style: 'tableHeader'
      },{
        text:"No of Feeders	",
        style: 'tableHeader'
      },{
        text:"District",
        style: 'tableHeader'
      },{
        text:"Town",
        style: 'tableHeader'
      },{
        text:"Circle",
        style: 'tableHeader'
      },{
        text:"Avg of act supply dur",
        style: 'tableHeader'
      },{
        text:"No. feeder supply < 22 hrs",
        style: 'tableHeader'
      },{
        text:"%",
        style: 'tableHeader'
      },{
        text:"Avg Sup feeders < 22 hrs",
        style: 'tableHeader'
      }]
      this.reportTitle ="Town Wise Report"
      var supperBody = [];
      widths  = [50, 150, 100, 100,100,100,100];

      supperBody.push(this.pdfHeader)
      for( var i =0 ;i<this.displayList.length ; i++){
        let body= [i+1,this.displayList[i].discom,
        this.displayList[i].count,
        this.displayList[i].district,
        this.displayList[i].town,
        this.displayList[i].circle,
        this.displayList[i].supply_duration
        ,this.displayList[i].OutageLessThan22Count
        ,this.displayList[i].percentage
        ,this.displayList[i].OutageLessThan22Durat]
        supperBody.push(body)

      }
    }if(this.authForm.value.reportType == 'DETAILS'){
      this.reportTitle ="Feeder Wise Report"
 
      this.pdfHeader = [{
        text:"SNo.",
        style: 'tableHeader'
      },{
        text:"Discom",
        style: 'tableHeader'
      },{
        text:"Zone	",
        style: 'tableHeader'
      },{
        text:"Circle",
        style: 'tableHeader'
      },{
        text:"Division",
        style: 'tableHeader'
      },{
        text:"Sub station	",
        style: 'tableHeader'
      },{
        text:"Feeder",
        style: 'tableHeader'
      } ,{
        text:"Town",
        style: 'tableHeader'
      },{
        text:"Meter SR No	",
        style: 'tableHeader'
      },{
        text:"Interruption Count		",
        style: 'tableHeader'
      },{
        text:"Outage Duration",
        style: 'tableHeader'
      },{
        text:"Avg Supply Duration",
        style: 'tableHeader'
      },{
        text:"Supply < 22 Hours	",
        style: 'tableHeader'
      },{
        text:"Supply count < 22 Hours		",
        style: 'tableHeader'
      },{
        text:"%		",
        style: 'tableHeader'
      },{
        text:"Avg Supply Duration",
        style: 'tableHeader'
      }]
      var supperBody = [];
      supperBody.push(this.pdfHeader)
        for( var i =0 ;i<this.displayList.length ; i++){
        let body= [
          i+1,this.displayList[i].discom,
        this.displayList[i].zone,
        this.displayList[i].circle,
        this.displayList[i].division,
        this.displayList[i].ss,
        this.displayList[i].feeder_name
        ,this.displayList[i].town
        ,this.displayList[i].appliance_id
        ,this.displayList[i].serial_no
        ,this.displayList[i].outagecount
        ,this.displayList[i].outage_duration
        ,this.displayList[i].supply_duration
        ,this.displayList[i].OutageLessThan22,"-","-","-"
]
        supperBody.push(body)

      }
    }
    console.log(JSON.stringify(supperBody[0]));
    var dd = {
      content: [
        
        {
          
          text: this.reportTitle , style: 'header'},
         {
          style: 'tableExample',
          table: {
            body:  supperBody
          }
        } 
      ],
      pageSize: 'A3' // A3, A5 or other standard page sizes
,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: 'black'
        },
        text:{
          fontSize: 10,
          color: 'black'

        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
      
    }
    pdfMake.createPdf(dd).download(this.reportTitle+'.pdf');
 

  }
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
  reportTitle = '';
  displayList: any = [];;
  getData(data, key , index) {  return data[key];
  }
  getSupplyDaily(){
    this.displayList = [];
    if(this.authForm.value.reportType == 'DISCOM'){
      this.name = 'discom'
      this.keyData = ["","discom","count","supply_duration","OutageLessThan22Count","percentage","OutageLessThan22Durat"];
      this.HeaderKey = [{
        name:"SNo.",
        Width:5
      },{
        name:"Discom Name",
        Width:20
      },{
        name:"Total No of Feeders	",
        Width:15
      },{
        name:"Average of actual supply duration",
        Width:15
      },{
        name:"No of feeders supply < 22 hrs",
        Width:25
      },{
        name:"%",
        Width:5
      },{
        name:"Avg Supply of feeders < 22 hrs",
        Width:15
      }]
      this.reportTitle ="Discom Report"
    }else  if(this.authForm.value.reportType == 'DISTRICT'){
      
      this.name = 'district'
      this.keyData = ["","discom","count","district", "supply_duration","OutageLessThan22Count","percentage","OutageLessThan22Durat"];
      this.HeaderKey = [{
        name:"SNo.",
        Width:5
      },{
        name:"Discom Name",
        Width:20
      },{
        name:"Total No of Feeders	",
        Width:15
      },{
        name:"District",
        Width:20
      },{
        name:"Average of actual supply duration",
        Width:30
      },{
        name:"No of feeders supply < 22 hrs",
        Width:30
      },{
        name:"%",
        Width:5
      },{
        name:"Avg Supply of feeders < 22 hrs",
        Width:30
      }]
      this.reportTitle ="District Wise Report"

    }else  if(this.authForm.value.reportType == 'TOWN'){
      
      
      this.name = 'town'
      this.keyData = ["","discom","count","district","town", "circle","supply_duration","OutageLessThan22Count","percentage","OutageLessThan22Durat"];
      this.HeaderKey = [{
        name:"SNo.",
        Width:5
      },{
        name:"Discom Name",
        Width:20
      },{
        name:"Total No of Feeders	",
        Width:15
      },{
        name:"District",
        Width:20
      },{
        name:"Town",
        Width:20
      },{
        name:"Circle",
        Width:20
      },{
        name:"Average of actual supply duration",
        Width:15
      },{
        name:"No of feeders supply < 22 hrs",
        Width:25
      },{
        name:"%",
        Width:5
      },{
        name:"Avg Supply of feeders < 22 hrs",
        Width:15
      }]
      this.reportTitle ="Town Wise Report"

    }else  if(this.authForm.value.reportType == 'DETAILS'){
      this.reportTitle ="Feeder Wise Report"
      this.name = 'feeder_name'

      this.keyData = ["","discom","zone","circle","division","ss","feeder_name","town" ,"appliance_id","serial_no","outagecount","outage_duration","supply_duration","OutageLessThan22","","",""];
      this.HeaderKey = [{
        name:"SNo.",
        Width:50
      },{
        name:"Discom",
        Width:200
      },{
        name:"Zone	",
        Width:100
      },{
        name:"Circle",
        Width:100
      },{
        name:"Division",
        Width:100
      },{
        name:"Sub station	",
        Width:200
      },{
        name:"Feeder",
        Width:150
      } ,{
        name:"Town",
        Width:100
      },{
        name:"Meter SR No	",
        Width:150
      },{
        name:"Interruption Count		",
        Width:200
      },{
        name:"Outage Duration",
        Width:150
      },{
        name:"Avg Supply Duration",
        Width:200
      },{
        name:"Supply < 22 Hours	",
        Width:200
      },{
        name:"Supply count < 22 Hours		",
        Width:200
      },{
        name:"%		",
        Width:50
      },{
        name:"Avg Supply Duration",
        Width:200
      }]

    }
    this.Service.getDailySupply(this.authForm.value).subscribe(res=>{
       this.TotalFeeder = 0;
      this.TotalactualSupply = 0;
      this.Totalsupplylessthan = 0;
this.Avgpercentage = 0 ;
var times = [];
      this.displayList = res[0].resources[0];
      if(this.authForm.value.reportType == 'DETAILS'){
      this.TotalFeeder =  this.displayList.length
      }
      if(this.authForm.value.reportType == 'DISCOM'){
        for(var i =0 ; i<this.displayList.length ;i++){
          this.TotalFeeder = this.TotalFeeder+   (this.displayList[i].count)
          this.TotalactualSupply =this.TotalactualSupply + (this.displayList[i].supply_duration)
          this.Totalsupplylessthan = this.Totalsupplylessthan + (this.displayList[i].OutageLessThan22Count)
          this.Avgpercentage = this.Avgpercentage+ this.displayList[i].percentage
          times.push(this.displayList[i].OutageLessThan22Durat)
        }

        var sum = 0

 
 var input = document.createElement('input')
input.type = 'time'

sum = times.reduce(function(prev, time) {
   if(parseInt(time) > 0){
    input.value = time
    return prev + input.valueAsNumber
  
  }else{
    return prev
  }
},0)
let timeGet = sum / times.length 
let seconds: number ;
  seconds = timeGet / 1000;
// 2- Extract hours:
var hours =  Math.floor( seconds / 3600 ); // 3,600 seconds in 1 hour
seconds = seconds % 3600; // seconds remaining after extracting hours
// 3- Extract minutes:
var minutes = Math.floor( seconds / 60 ); // 60 seconds in 1 minute
// 4- Keep only seconds not extracted to minutes:
seconds = seconds % 60;
 
this.Avgfeederlessthan =           hours+":"+minutes+":"+ Math.floor(seconds); 


         this.Avgpercentage =               Math.round(        this.Avgpercentage / this.displayList.length  * 100 ) /100 ; 
  
      }

    })
  }
  TotalFeeder:any = 0;
  TotalactualSupply:any = 0;
  Totalsupplylessthan:any = 0;
  Avgpercentage :any = 0;
  Avgfeederlessthan:any = 0;
  
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
    if(btn.icon == 'picture_as_pdf'){
      this.createPdf();
    }else if( btn.icon == 'assignment'){
      this.ExportTOExcel()
    }
  }
}
