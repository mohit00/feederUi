import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supply-report',
  templateUrl: './supply-report.component.html',
  styleUrls: ['./supply-report.component.scss']
})
export class SupplyReportComponent implements OnInit {

  constructor(private Router:Router) { }
  changePage(data){
     
    this.Router.navigate([data])
      }
  ngOnInit() {
  }

}
