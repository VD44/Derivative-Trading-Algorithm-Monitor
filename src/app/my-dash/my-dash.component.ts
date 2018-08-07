import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-my-dash',
  templateUrl: './my-dash.component.html',
  styleUrls: ['./my-dash.component.css']
})
export class MyDashComponent {
  cards:any
  objectKeys:any;
  setCards(cardDataArr){
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        var cols = matches ? 2 : 1;
        var arr = [];
        for(var i = 0; i < cardDataArr.length;i++){
          var obj = cardDataArr[i];
          obj['cols'] = cols;
          obj['rows'] = 1;
          arr.push(obj);
        }
        return arr;
      })
    );
  }

  round(val){
    return Math.round(val*100)/100;
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
  }
  constructor(private breakpointObserver: BreakpointObserver, private _data : DataService) {
    this.objectKeys = Object.keys;
    this._data.getAllStats();
    this._data.statsObj.subscribe(result => this.setCards(result));
  }
}
