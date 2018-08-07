import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  pollUrl = 'http://localhost:8008/data';
  statsUrl = 'http://localhost:8008/stats';
  keysEmail = 'algo.keys@gmail.com';

  // how often to poll server (ms)
  updateInterval = 60000;

  private statsSub:any;
  statsObj:any;
  private dataSub:any;
  dataObj:any;
  private requestSub:any;
  requestObj:any;
  updateTimer : any;
  result:any;

  constructor(public _http: HttpClient) {
    this.statsSub = new BehaviorSubject([]);
    this.statsObj = this.statsSub.asObservable();
    this.dataSub = new BehaviorSubject({});
    this.dataObj = this.dataSub.asObservable();
    this.requestSub = new BehaviorSubject({'key':''})
    this.requestObj = this.requestSub.asObservable();
    this.requestObj.subscribe(res => this.pollAlgData());
    this.updateTimer = timer(0, this.updateInterval)
    this.updateTimer.subscribe(this.pollAlgData());
  }

  setRequestVal(key, val){
    var obj = this.requestSub.getValue();
    if(obj[key] != val){
      obj[key] = val;
      this.requestSub.next(obj);
    }
  }

  getAllStats(){
    return this._http.get(this.statsUrl).subscribe(
      result => {
        this.statsSub.next(result);
      },
      err => {
        console.log("Error occured during get request.");
      }
    );
  }

  pollAlgData(){
    var requestBody = this.requestSub.getValue();
    if(typeof requestBody != "undefined" && 'id' in requestBody && 'key' in requestBody){
      const httpOptions = {
        headers: new HttpHeaders(
          {
            'Content-Type':'application/json',
            'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
          }
        )
      };
      return this._http.post(this.pollUrl, requestBody, httpOptions).subscribe(
        result => {
          if(typeof result == "object")
            this.dataSub.next(result);
          console.log(result);
        },
        err => {
          console.log("Error occured during post request.");
        }
      );
    }
  }
}