import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {AuthService} from '../service/auth/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm:FormGroup;

  constructor(private route : Router,private fb: FormBuilder,private service:AuthService){ 
    this.myForm =   fb.group({
      login_id:['',Validators.required],
      password:['',Validators.required]
    })
  }
  ngOnInit() {
  }
  dash(){
  if(this.myForm.valid){
     this.service.login(this.myForm.value).subscribe(res=>{
       this.service.setUserdetail(( res));
     
      this.route.navigate(['/dashboard']);

    })

  }
  }
}
