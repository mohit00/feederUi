import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private Router:Router) { }
  dateHeader : any= new Date();
  changePage(data){
     
this.Router.navigate([data])
  }
  ngOnInit() {
  }

}
