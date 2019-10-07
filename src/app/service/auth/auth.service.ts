import { Injectable, EventEmitter } from '@angular/core';
 
import { HttpClient , HttpInterceptor, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

   import { Subject } from 'rxjs';
 @Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'https://feeder.myxenius.com/webapi/v1/';

  constructor(private _http: HttpClient, private router: Router 
    // tslint:disable-next-line: no-shadowed-variable
                 ) {
     }
     setUserdetail(data){
       sessionStorage.setItem('userdetail',JSON.stringify(data))
     }
     login(data:string): Observable < any > {
      return this._http.post(  this.BASE_URL+'login', data).pipe(
        // eg. "map" without a dot before
        map(data => {
          return data;
        }),
        // "catchError" instead "catch"
        catchError(error => {
          alert("Something went wrong ;)");
          return Observable.throw('Something went wrong ;)');
        })
      );
    }
   
     handleError = (e)=>{

     }
}

