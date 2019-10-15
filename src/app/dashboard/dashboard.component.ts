import { Component, OnInit, Inject } from '@angular/core';
import { FeederService } from '../service/feeder/feeder.service'
import * as Highcharts from "highcharts";
import * as HighchartsMore from "highcharts/highcharts-more";
import * as HighchartsExporting from "highcharts/modules/exporting";
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {DialogComponent} from '../dashboard/dialog/dialog'
//  HighchartsMore(Highcharts);
//  HighchartsExporting(Highcharts);

@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   bsModalRef: BsModalRef;

   projectId: any = 'ALL';
   selectProject(data) {
      this.projectId = data;

      if (data != '16 NN') {
         this.feederProjectCount();
         this.getWorstBestFeeder('interruption');
         this.averageSupply(
            this.bsValue, '1')
            this.supplyGraph(this.hour)

      } else {

      }

   }
   config = {
      fade: true,
      alwaysOn: false,
      neverOn: false,

      // fill
      fill: true,
      fillColor: '#ffffff',
      fillOpacity: 0.4,

      // stroke
      stroke: true,
      strokeColor: '#4d0ec0',
      strokeOpacity: 1,
      strokeWidth: 1,

      // shadow:
      shadow: true,
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      shadowRadius: 10
   }
   bsValue :any;
   bsValue2 :any;
   maxDate: Date;
   title = 'My first AGM project';
   lat = 51.678418;
   lng = 7.809007;
   chart;
   chart1;
   chart2;
   chart3;
   chart8;
   pipe = new DatePipe('en-US');

   constructor(private service: FeederService,private modalService: BsModalService) {
      this.bsValue = new Date(Date.now() - 864e5);

      var startdate = moment(new Date());
      startdate = startdate.subtract(1, "days");

      let newdate = startdate.format();

      this.maxDate = new Date(newdate);
      const self = this;

      this.chartCallback = chart => {
         self.chart = chart;
      };

      this.chartCallback1 = chart1 => {
         self.chart1 = chart1;
         console.log(chart1);
      };
      this.chartCallback3 = chart3 => {
         self.chart3 = chart3;
         console.log(chart3);
      };
      this.chartCallback8 = chart8 => {
         self.chart8 = chart8;
         console.log(chart8);
      };
      this.chartCallback2 = chart2 => {
         self.chart2 = chart2;
         console.log(chart2);
      };
   }
   isCollapsed = false;
   Highcharts: typeof Highcharts = Highcharts;
   highcharts = Highcharts;
   chartOptions = {
      events: {
         load: function () {
            if (!this.renderer.forExport) {
               this.chart = this;
            }
         }
      },

      chart: {
         type: 'bar'

      },
      colors: ["#0cc2a9", "#f47a25", "#7673e6"],

      title: {
         text: ''
      },
      subtitle: {
         text: ''
      },
      legend: {
         layout: 'horizontal',
         // align: 'top',
         // verticalAlign: 'top',
         // x: 320,
         // y: 20,
         floating: false,
         borderWidth: 1
      },
      xAxis: {
         categories: ['Industrial', 'Urban', '16 Nagar'], title: {
            text: 'No. of Feeders (percentage)'
         }
      },
      yAxis: {
         min: 0, title: {
            text: '', align: 'high'
         },
         labels: {
            overflow: 'justify'
         }
      },
      tooltip: {
      },
      plotOptions: {
         bar: {
            dataLabels: {
               enabled: true
            }
         }
      },
      credits: {
         enabled: false
      },
      series: [



         {
            name: 'OK',
            data: [973, 914, 4054],

         }, {
            name: 'Not OK',
            data: [973, 914, 4054]
         }, {
            name: 'Outage',
            data: [133, 156, 947]
         }
      ], exporting: {
         enabled: true
      }
   };
   updateFlag = false;
   updateFlag1 = false;
   updateFlag2 = false;
   updateFlag3= false;

   updateFlag8 = false;
   chartCallback;
   chartCallback1;
   chartCallback3;
   chartCallback2;
   chartCallback8;

   chartOptions1 = {
      chart: {
         plotBorderWidth: null,
         plotShadow: false
      },
      colors: ["#00ca8e", "#cc5f89"],

      title: {
         text: ''
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',

            dataLabels: {
               enabled: false
            },

            showInLegend: true
         }
      },
      series: [{
         type: 'pie',
         name: 'Energy share',
         data: [
            ['Industrial', 80],
            {
               name: 'Urban',
               y: 20,
               sliced: true,
               selected: true
            },

         ]
      }]
   };

   chartOptions3 = {
      chart: {
         type: 'column'
      },
      colors: ["#0cc2a9", "#f47a25", "#7673e6", "#ffb209", "#0cc3a9"],
      title: {
         text: ''
      },
      xAxis: {
         categories: ['DVVNL', 'KESco', 'MVVNL', 'PuVVNL', 'PVVNL']
      },
      yAxis: {
         allowDecimals: false,
         min: 0,
         title: {
            text: ''
         }
      },
      plotOptions: {
         column: {
         }
      },
      credits: {
         enabled: false
      },
      series: [
         {
            name: 'Feeder Count',
            data: [521, 332, 324, 24, 51],
         }
      ]
   };
   chartOptions7 = {
      chart: {
         type: 'column'
      },
      colors: ["#0cc2a9", "#f47a25", "#7673e6", "#ffb209", "#0cc3a9"],
      title: {
         text: ''
      },
      xAxis: {
         categories: ['DVVNL', 'KESco', 'MVVNL', 'PuVVNL', 'PVVNL']
      },
      yAxis: {
         allowDecimals: false,
         min: 0,
         title: {
            text: ''
         }
      },
      plotOptions: {
         column: {
         }
      },
      credits: {
         enabled: false
      },
      series: [
         {
            name: 'Average Supply Duration',
            data: [521, 332, 324, 24, 51],
         }
      ]
   };

   chartOptions4 = {
      title: {
         text: ''
      },
      xAxis: {
         categories: ['Industrial', 'Urban']
      },
      colors: ["#ffb20a", "#6f8cd8"],
      labels: {
         items: [{
            html: '',
            style: {
               left: '50px',
               top: '18px'
            }
         }]
      },
      series: [
         {
            type: 'column',
            name: 'MVA',
            data: [11, 24]
         },
         {
            type: 'column',
            name: 'MV',
            data: [10, 22]
         },

         {
            type: 'pie',
            name: 'Total consumption',
            colors: ["#ffb20a", "#6f8cd8"],

            data: [
               {
                  name: 'MVA',
                  y: 35,
                  color: "#ffb20a" // Jane's color
               },
               {
                  name: 'MV',
                  y: 32,
                  color: "#6f8cd8" // John's color
               }
            ],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
               enabled: false
            }
         },
      ]
   };
   chartOptions5 = {
      chart: {
         type: 'column'
      },
      title: {
         text: ''
      },
      subtitle: {
         text: ''
      },
      legend: {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 250,
         y: 100,
         floating: true,
         borderWidth: 1,

         shadow: true
      },
      xAxis: {
         categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'], title: {
            text: null
         }
      },
      yAxis: {
         min: 0,
         title: {
            text: 'Population (millions)',
            align: 'high'
         },
         labels: {
            overflow: 'justify'
         }
      },
      tooltip: {
         valueSuffix: ' millions'
      },
      plotOptions: {
         column: {
            dataLabels: {
               enabled: true
            }
         },
         series: {
            stacking: 'normal'
         }
      },
      credits: {
         enabled: false
      },
      series: [
         {
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
         },
         {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
         },
         {
            name: 'Year 2008',
            data: [973, 914, 4054, 732, 34]
         }
      ]
   };
   hr: any;
   chartOption6 = {
      tooltip: {

         formatter: function () {
               var ghours   = Math.floor(parseInt(this.y) / 60);
               var gminutestime = Math.floor((parseInt(this.y) - ((ghours * 3600)) / 60));
               var gseconds = Math.floor((parseInt(this.y)* 60) - (ghours * 3600) - (gminutestime * 60));

            return ' <b>' + this.x + '</b> <br> ' + this.series.name + ' <b>' + ghours+':' + gminutestime+ ':'+gseconds+' </b>';
         }
      },
      

      chart: {
         type: 'column'
      },
      title: {
         text: ''
      },
      xAxis: {
         categories: [
            'DVVNL ',
            'KESco',
            'MVVNL',
            'PuVVNL',
            'PVVNL'
         ]
      },
      yAxis: [{
         min: 0,
         max: 1440,
         labels: {
            formatter: function () {
               //get the timestamp
               var time = this.value;

               this.hr = (this.value / 60)

               if (this.hr > 24) {
                  this.hr = 24
               }
               if (this.hr <= 24) {
                  return parseInt(this.hr) + ':00:00'

               }

               //now manipulate the timestamp as you wan using data functions
            }
         },
         title: {
            text: 'Average supply & interuption'
         }
      }, {
         title: {
            text: ' '
         },
         opposite: true
      }],
      legend: {
         shadow: false
      },

      plotOptions: {
         series: {
            cursor: 'pointer',
            point: {
            events: {
                 
                 click: (function(event){  
            
                  console.log();
if(event.point.series.name.split(" ")[0] == 'Last'){
   this.openDialog('AverageSupply',event.point.category,'PastDaysAvg');

}else{
   this.openDialog('AverageSupply',event.point.category,'currentDay');

}
                       
                
              }).bind(this)
            }
         }
            
        },
         column: {
            pointPadding: 0.1,
            borderWidth: 0
         }
      },
      series: [{
         name: 'Average supply',
         color: '#6f8dd7',
         data: [150, 73, 20, 50, 20],
      }, {
         name: 'Average Interuption',
         color: '#2ab5f6',
         data: [40, 20, 10, 10, 15],
      }]


   }
   chartOptions8 = {
      chart: {
         type: 'column'
      },
      title: {
         text: ''
      },
      subtitle: {
         text: ''
      },
      xAxis: {
         categories: ['Daskhmanchal', 'KESco', 'Madhayanchal', 'Purvanchal', 'Paschimanchal'],
         crosshair: true
      }, colors: ['#01a89e', '#01a89e', '#01a89e', '#01a89e', '#01a89e'],
      yAxis: {
         min: 0,
         title: {
            text: 'No. Of Load'
         }
      },
      tooltip: {
         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
      },
      plotOptions: {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
      },
      series: [
         {
            name: 'Feeder',
            data: [83, 78, 98, 32, 51]
         },

      ]
   };
   ProjectCountList: any;
   feederProjectCount() {

      let projectdata = {
         "login_id ": this.userdata.login_id,
         "token_id ": this.userdata.resources[0].token_id,
         "access_area": this.userdata.access_area,
         "access_area_id": '1',
         "project_id": this.projectId
      };
      this.service.getfeederProject(projectdata).subscribe(res => {
         // alert(JSON.stringify(res.resources))
         this.ProjectCountList = res.resources;
         this.getfeederStatisticdata("1");

      })
   }
   okdataCount: any = [];
   discomName: any = [];

   notdatacount: any = [];
   outagedataCount: any = [];
   modemNotconnectingCount: any = [];
   chartConstructor = "chart";
   chartConstructor1 = "chart";

   getfeederStatisticdata(type) {

      this.okdataCount = [];
      this.discomName = [];

      this.notdatacount = [];
      this.outagedataCount = [];
      let projectdata = {
         "login_id ": this.userdata.login_id,
         "token_id ": this.userdata.resources[0].token_id,
         "access_area": this.userdata.access_area,
         "access_area_id": '1',
         "project_id": this.projectId
      };

      this.chart.showLoading();

      this.service.getfeederStatisticData(projectdata).subscribe(res => {

         for (var i = 0; i < res.resources.length; i++) {
            this.discomName.push(res.resources[i].discomName);
            this.okdataCount.push(res.resources[i].up);
            this.notdatacount.push(res.resources[i].nc + res.resources[i].np);
            this.outagedataCount.push(res.resources[i].dn);
            // this.modemNotconnectingCount.push(res.resources[i].lt);

         }

         // self.chartOptions.xAxis.categories = this.discomName;

         // self.chartOptions.series[0].data = this.okdataCount;
         // self.chartOptions.series[1].data = this.okdataCount;
         // self.chartOptions.series[2].data = this.okdataCount;
         // self.chartOptions.series[3].data = this.okdataCount;
         // console.log(JSON.stringify(self.chartOptions))
         // this.chartOptions.series  =  this.chartOptions.series;

         setTimeout(() => {
            this.chart.hideLoading();
            // self.chartOptions.series = [
            //   {
            //     data: [10, 25, 15]
            //   },
            //   {
            //     data: [12, 15, 10]
            //   }
            // ];
            if (type == '1') {
               this.chartOptions.series[0].name = "OK"
               this.chartOptions.series[1].name = "Not OK"
               this.chartOptions.series[2].name = "Outage"


            } else {
               this.chartOptions.series[0].name = "Last 7 Day OK"
               this.chartOptions.series[1].name = "Last 7 Day Not OK"
               this.chartOptions.series[2].name = "Last 7 Day Outage"

            }

            // this.chartOptions.xAxis.categories = this.discomName;

            this.chartOptions.xAxis.categories = this.discomName;
            this.chartOptions.series[0].data = this.okdataCount;
            this.chartOptions.series[1].data = this.notdatacount;
            this.chartOptions.series[2].data = this.outagedataCount;
            // this.chartOptions.series[3].data = this.modemNotconnectingCount;
            this.updateFlag = true;
            setTimeout(() => {

               this.updateFlag = false;
            }, 122);
         }, 1000);
      })
   }

   averageSupply(date: Date, type) {
      this.chartOption6.series[0].name = "Average Supply"
      this.chartOption6.series[1].name = "Average Interuption"
       let reportType = 'currentDay'

      if (type == '2') {
         this.chartOption6.series[0].name = "Last 7 day Average Supply"
         this.chartOption6.series[1].name = "Last 7 day  Average Interuption"
          reportType = 'PastDaysAvg'
         let startdate = moment(date);
         startdate = startdate.subtract(7, "days");
         date = new Date(startdate.toString());

      } else {

      }
      //    var startdate =  moment(date);
      // startdate =startdate.subtract(1, "days");
      // let newdate  = startdate.format("DD-MM-YYYY");
      let dataJson = {
         "login_id ": this.userdata.login_id,
         "token_id ": this.userdata.resources[0].token_id,
         "access_area": this.userdata.access_area,
         "access_area_id": '1',
         "project_id": this.projectId,
         "date": this.pipe.transform(date, 'yyyy-MM-dd'),
         reportType,
         discom_id:'All',
         "hour":'0'

      };
       setTimeout(() => {
         this.chart1.showLoading();

         let discomname = [];
         let supplyduration = [];
         let interduration = [];

         this.service.averageSupply(dataJson).subscribe(res => {
            this.chart1.hideLoading();
 
             for (var i = 0; i < res.resources.length; i++) {
               discomname.push(res.resources[i].discom_name);
               // your input string
               // var a = res.resources[i].supply_duration; // split it at the colons

               // // Hours are worth 60 minutes.
               // var minutes = parseInt(a[0]) * 60 + parseInt(a[1]) + (parseInt(a[2]) / 60);


               // var a2 = res.resources[i].outage_duration.split(':'); // split it at the colons

               // // Hours are worth 60 minutes.
               // var minutes2 = parseInt(a2[0]) * 60 + parseInt(a2[1]) + (parseInt(a2[2]) / 60);

               var hours   = Math.floor(parseInt(res.resources[i].supply_duration) / 60);
               var minutestime = Math.floor((parseInt(res.resources[i].supply_duration) - ((hours * 3600)) / 60));
               var seconds = Math.floor((parseInt(res.resources[i].supply_duration )* 60) - (hours * 3600) - (minutestime * 60));
               
                var minutes = hours * 60 + minutestime+ (seconds / 60);


               // Appends 0 when unit is less than 10
                var hours1   = Math.floor(parseInt(res.resources[i].outage_duration) / 60);
                var minutes1 = Math.floor((parseInt(res.resources[i].outage_duration) - ((hours1 * 3600)) / 60));
                var seconds1 = Math.floor((parseInt(res.resources[i].outage_duration )* 60) - (hours1 * 3600) - (minutes1 * 60));
                 var minutes2 = hours1 * 60 + minutes1 + (seconds1 / 60);

 
               supplyduration.push((minutes));
               interduration.push((minutes2));

            }
            this.chartOption6.xAxis.categories = discomname;
            this.chartOption6.series[0].data = supplyduration;
            this.chartOption6.series[1].data = interduration;
            console.log(JSON.stringify(this.chartOption6));
            this.updateFlag1 = true;

         })
      }, 300)
   }

   userdata: any = this.service.getuser;
   nameFeederData: any = [];
   dataFeederData: any = [];
   onValueChange(value: Date): void {
      this.bsValue = value;
      this.averageSupply(value, '1')
   }
   onValueChange2(value: Date): void {
   this.bsValue2 = value;
      this.supplyGraph(this.hour)
   }
   typeselected: any = "Interruption";
   bestdata: any;
   selectedType: any = '';
   worstdata: any;
   getWorstBestFeeder(type) {
      if (type == 'interruption') {
         this.typeselected = 'Interruption'
      } else if (type == 'average_duration') {
         this.typeselected = 'Average Duration'

      } else if (type == 'duration') {
         this.typeselected = 'Duration'


      }
      this.nameFeederData = [];
      this.dataFeederData = [];
      let dataJson = {
         "login_id ": this.userdata.login_id,
         "token_id ": this.userdata.resources[0].token_id,
         "access_area": this.userdata.access_area,
         "access_area_id": '1',
         "project_id": this.projectId,
         "month": this.pipe.transform(new Date(), 'yyyy-MM'),
         "type": type,
         "feederCount": "5"
      }
     
      this.service.getWorstBest(dataJson).subscribe(res => {
         this.bestdata = []
      this.worstdata = [];
         for (var i = 0; i < res.resources.length; i++) {
            if (res.resources[i].status == 'BEST') {
               this.bestdata.push(res.resources[i]);
            } else {
               this.worstdata.push(res.resources[i]);
            }
         }

         // if(this.selectedType == 'Best'){

         //    for(var i =0 ; i<this.bestdata.length ; i ++){
         //      this.nameFeederData.push(this.bestdata[i].feederName)
         //      this.dataFeederData.push(parseInt(this.bestdata[i].outageCount))

         //      // this.chartOptions8.series.push({
         //      //    name : this.bestdata[i].feederName,

         //      // })
         //   }

         //  }
         // console.log(JSON.stringify(this.chartOptions8));
         // this.chart8.hideLoading();

         this.updateFlag8 = true;
         setTimeout(() => {

            this.updateFlag8 = false;
         }, 122);
      })


   }
   hour:any = 22;
   supplyDiscomName : any = [];
   supplyDiscomCount: any = [];

supplyGraph(hr){

    let dataJson = {
      "login_id ": this.userdata.login_id,
      "token_id ": this.userdata.resources[0].token_id,
      "access_area": this.userdata.access_area,
     "access_area_id":"1",
          "project_id":this.projectId,
          "date":this.pipe.transform(this.bsValue2, 'yyyy-MM-dd'),
          "discom_id":"All",
          "hour":hr,
          reportType:'currentDay'
         }
         
        setTimeout(()=>{
         this.chart3.showLoading();
   
        },300)
    this.service.getDialogAvg(dataJson).subscribe(res=>{
      this.updateFlag3 = true;
      this.supplyDiscomName = [];
      this.supplyDiscomCount = [];
      console.log(JSON.stringify(res))
     for(var i = 0 ;i<res.resources.length ; i++){
         this.supplyDiscomName.push(res.resources[i].discom_name);
         this.supplyDiscomCount.push(parseInt(res.resources[i].count))
     }
     this.chartOptions3.xAxis.categories = this.supplyDiscomName;
     this.chartOptions3.series[0].data = this.supplyDiscomCount;
    console.log("Chart Option 3"  + JSON.stringify(this.chartOptions3))
    this.chart3.hideLoading();
    setTimeout(()=>{
      this.updateFlag3 = false;
    },1000)
   })
}
   ngOnInit() {
      this.bsValue = new Date(Date.now() - 864e5);
      this.bsValue2 = new Date(Date.now() - 864e5);
   
      this.feederProjectCount();
      this.getWorstBestFeeder('interruption');
   }
   getClass(data) {
      if (data == 'ALL') {
         return 'card  gray '
      } else if (data == 'EODB') {
         return 'card  blue'
      } else if (data == 'IPDS') {
         return 'card  purple'
      } else if (data == 'NTPF') {
         return 'card red '
      } else if (data == 'REC') {
         return 'card blue'
      } else if (data == '16 NN') {
         return 'card green'
      } else {
         return 'card  gray '

      }
   }

   mapShow:boolean = true;
   dvvnlShow:boolean = false;
   mvvnlShow:boolean = false;
   puvnlShow:boolean = false;
   pvvnlShow:boolean = false;
   kescoShow : boolean= false;

   openDialog(type,data,reportType): void { 
       const initialState = {
      type,
      data,
      date:  this.bsValue,
      projectId:this.projectId,
      reportType:reportType
       };
       console.log(JSON.stringify(initialState))
       this.bsModalRef = this.modalService.show(DialogComponent,  {initialState, class: 'gray modal-lg' });
   
       this.bsModalRef.content.onClose.subscribe(result => {
         console.log('results', result);
   });

   }
   backPage(){
      this.mapShow = true;
      this.dvvnlShow = false;
      this.mvvnlShow = false;
      this.puvnlShow = false;
      this.pvvnlShow = false;
      this.kescoShow= false;

   }
   detailShow :any = [
      {
         name:'Discom Type',
         data:'All'
      },{
         name:'Total Feeder',
         data:'455'
      },{
         name:'Avg Supply( Monthly)',
         data:'139:23:2'
      },{
         name:'Max Load',
         data:'564'
      },{
         name:'Energy Supplied',
         data:'56%'
      },{
         name:'Consumer Count',
         data:'0'

      }

   ]

   mouseEnter(data){
if(data == 'PVVNL'){
this.detailShow = [
   {
      name:'Discom Type',
      data:'PVVNL'
   },{
      name:'Total Feeder',
      data:'323'
   },{
      name:'Avg Supply( Monthly)',
      data:'139:23:2'
   },{
      name:'Max Load',
      data:'42'
   },{
      name:'Energy Supplied',
      data:'23%'
   },{
      name:'Consumer Count',
      data:'0'

   }

]
}else if(data == 'DVVNL'){
   this.detailShow = [
      {
         name:'Discom Type',
         data:'DVVNL'
      },{
         name:'Total Feeder',
         data:'323'
      },{
         name:'Avg Supply( Monthly)',
         data:'139:23:2'
      },{
         name:'Max Load',
         data:'42'
      },{
         name:'Energy Supplied',
         data:'23%'
      },{
         name:'Consumer Count',
         data:'0'
   
      }
   
   ]
}else if(data == 'MVVNL'){
   this.detailShow = [
      {
         name:'Discom Type',
         data:'MVVNL'
      },{
         name:'Total Feeder',
         data:'323'
      },{
         name:'Avg Supply( Monthly)',
         data:'139:23:2'
      },{
         name:'Max Load',
         data:'42'
      },{
         name:'Energy Supplied',
         data:'23%'
      },{
         name:'Consumer Count',
         data:'0'
   
      }
   
   ]
}else if(data == 'PuVVNL'){
   this.detailShow = [
      {
         name:'Discom Type',
         data:'PuVVNL'
      },{
         name:'Total Feeder',
         data:'323'
      },{
         name:'Avg Supply( Monthly)',
         data:'139:23:2'
      },{
         name:'Max Load',
         data:'42'
      },{
         name:'Energy Supplied',
         data:'23%'
      },{
         name:'Consumer Count',
         data:'0'
   
      }
   
   ]
}else if(data == 'KESCO'){
   this.detailShow = [
      {
         name:'Discom Type',
         data:'KESCO'
      },{
         name:'Total Feeder',
         data:'323'
      },{
         name:'Avg Supply( Monthly)',
         data:'139:23:2'
      },{
         name:'Max Load',
         data:'42'
      },{
         name:'Energy Supplied',
         data:'23%'
      },{
         name:'Consumer Count',
         data:'0'
   
      }
   
   ]
}
   }
   mouseLeave(){
this.detailShow = [
   {
      name:'Discom Type',
      data:'All'
   },{
      name:'Total Feeder',
      data:'455'
   },{
      name:'Avg Supply( Monthly)',
      data:'139:23:2'
   },{
      name:'Max Load',
      data:'564'
   },{
      name:'Energy Supplied',
      data:'56%'
   },{
      name:'Consumer Count',
      data:'0'

   }

]
   }
   changeDistrictMap(data){
      this.mapShow = false;
      if(data == 'DVVNL'){
         this.dvvnlShow = true;

      }else if(data == 'MVVNL'){
         this.mvvnlShow = true;

      }
      else if(data == 'PuVVNL'){
         this.puvnlShow= true;

      }
      else if(data == 'PVVNL'){
         this.pvvnlShow= true;

      } else if(data == 'KESCO'){
         this.kescoShow= true;

      }
      

    }

}
 