import { Component, OnInit } from '@angular/core';
 import { BsModalRef } from 'ngx-bootstrap/modal';
 import {NgForm} from '@angular/forms';
 import {Subject} from 'rxjs';
import {FeederService} from  '../../service/feeder/feeder.service' ;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attribute-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.scss']
})
export class DialogComponent implements OnInit {
    public onClose: Subject<boolean>;
    data:any;
    type:any;
    date:any;
    headerTitle:any='';
    userdata: any = this.Service.getuser;
    keyData:any;
    reportType:any;
    constructor(private _bsModalRef: BsModalRef,private Service:FeederService
        // tslint:disable-next-line: no-shadowed-variable
                       ) {
          }
          projectId:any;
          pipe = new DatePipe('en-US');
          displayList:any = [];;
          HeaderKey:any;
          getData(data, key , index) {  return data[key];
          }
          name:any;
          getSupplyData(){
this.name = 'feeder_name';
            this.headerTitle = 'Average Supply'
            this.HeaderKey = [{
              name:"SNo.",
              Width:5
            },{
              name:"Discom Name",
              Width:10
            },{
              name:"Zone	",
              Width:10
            },{
              name:"District",
              Width:10
            },{
              name:"Circle",
              Width:10
            },{
              name:'Town',
              Width:10
            } ,{
              name:'Division',
              Width:10
            } ,{
              name:'Sub Station',
              Width:10
            } ,{
              name:'Feeder',
              Width:10
            },{
              name:'Project',
              Width:10
            }]
            this.keyData = ["","discom","zone","district","circle","town","division", "ss","feeder_name","project" ];

              const discom_id = this.data;
let dataJson = {
  
    "login_id ": this.userdata.login_id,
    "token_id ": this.userdata.resources[0].token_id,
    "access_area": this.userdata.access_area,
   "access_area_id":"1",
        "project_id":this.projectId,
        "date":this.pipe.transform(this.date, 'yyyy-MM-dd'),
        "discom_id":discom_id,
        "reportType":this.reportType,
        "hour":"0",
        
       

}
this.displayList = [];
 this.Service.getDialogfeederAvg(dataJson).subscribe(res=>{
console.log(JSON.stringify(res))
  
    this.displayList = res.resources;
})
          }
          hoursp:any;
          minutesp:any;
          secondsp:any;
          bestWorstFeeder(){
            this.HeaderKey = [{
              name:"SNo.",
              Width:5
            },{
              name:"Feeder Name",
              Width:15
            },{
              name:"Discom Name	",
              Width:10
            },{
              name:"Sub Station",
              Width:10
            },{
              name:"Meter Sr No",
              Width:10
            },{
              name:'Type',
              Width:5
            } ,{
              name:'From Date',
              Width:10
            } ,{
              name:'To Date',
              Width:10
            } ,{
              name:'Avg Outage Count',
              Width:10
            }]
            this.keyData = ["","feederName","discomName","substationName","meterSrNo","type","from_date", "to_date","avg_outage_count" ];

            this.displayList = [];

            this.displayList.push(this.data);
           }
     ngOnInit() {
        this.onClose = new Subject();
        console.log(this.type);
         console.log(this.data)
        if(this.type == 'AverageSupply'){
            this.getSupplyData();
        }else if(this.type == 'bestWorst'){
          
if(this.reportType == 'Best'){
  this.bestWorstFeeder();

this.headerTitle = 'Best Feeder';
}else if(this.reportType =='Worst'){
  this.headerTitle = 'Worst Feeder';


}
        }


    }
    public onCancel(): void {
        this.onClose.next(false);
        this._bsModalRef.hide();
    }

}