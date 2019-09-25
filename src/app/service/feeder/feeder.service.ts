import { Injectable,EventEmitter } from '@angular/core';
  
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
export class FeederService {
  BASE_URL = 'https://feeder.myxenius.com/webapi/v1/';
  GET_FEEDER_PROJECT_WITH_COUNT = 'getFeederStatistics';
  GET_FEEDER_STATISTIC_DATA =  'getFeederStatisticsGraphData'
  LAST_7_DAYS_FEEDER_SATUS = 'getFeederStatisticsHistory';
  AVERAGE_SUPPLY = 'getAvgSupplyStatus';
  INTERRUPTION_DATA = 'getInterruptionData';
  GET_BEST_AND_WORST = 'getBestAndWorstFeeder'
   constructor(private _http: HttpClient, private router: Router 
    // tslint:disable-next-line: no-shadowed-variable
                 ) {
     }
     get getuser(){
      return JSON.parse(sessionStorage.getItem('userdetail'));
     }
     getfeederProject(data:any): Observable < any > {
      return this._http.post(  this.BASE_URL+this.GET_FEEDER_PROJECT_WITH_COUNT, data).pipe(
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
    getWorstBest(data:any): Observable < any > {
      return this._http.post(  this.BASE_URL+this.GET_BEST_AND_WORST, data).pipe(
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
    getfeederStatisticData(data:any): Observable < any > {
      return this._http.post(  this.BASE_URL+this.GET_FEEDER_STATISTIC_DATA, data).pipe(
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
    getFeeder7Status(data:any): Observable < any > {
      return this._http.post(  this.BASE_URL+this.LAST_7_DAYS_FEEDER_SATUS, data).pipe(
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
    averageSupply(data:any): Observable < any > {
      return this._http.post(  this.BASE_URL+this.AVERAGE_SUPPLY, data).pipe(
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
    interuptionData(data:any): Observable < any > {
      return this._http.post(  this.BASE_URL+this.INTERRUPTION_DATA, data).pipe(
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
     
}

