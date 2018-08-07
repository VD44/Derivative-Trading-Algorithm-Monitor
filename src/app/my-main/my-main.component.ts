import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-my-main',
  templateUrl: './my-main.component.html',
  styleUrls: ['./my-main.component.css']
})
export class MyMainComponent implements OnInit {
  
  algorithmColor = '#3cba9f';
  benchmarkColor = '#3f51b5';

  status:number;
  stats:any;
  opts:any;
  selectedOptions:any;

  dates:string[];
  algorithm:number[];
  benchmark:number[];
  benchSymb:string;

  triedKey:boolean;
  objectKeys:any;
  chart:Object;

  constructor(private _data : DataService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.status = 500;
    this.selectedOptions = {};
    this.triedKey = false;
    this.objectKeys = Object.keys;
    this.chart = Object();
    this._route.params.subscribe(params => this._data.setRequestVal('id', params['id']));
    this._data.dataObj.subscribe(result => {
      this.status = result['status'];
      if(this.status == 200){
        this.opts = result['options'];
        this.stats = result['stats'];
        this.dates = result['dates'];
        this.algorithm = result['algorithm'];
        this.benchmark = result['benchmark'];
        this.benchSymb = result['benchmark-symbol'];
        var keys = Object.keys(result['defaults']);
        for(var i = 0; i < keys.length; i++)
          if(!(keys[i] in this.selectedOptions))
            this.selectedOptions[keys[i]] = result['defaults'][keys[i]];
        this.plotChart();
      }
    });
  }

  round(val){
    return Math.round(val*100)/100;
  }

  percent(val){
    return Math.round(val*100)+"%";
  }

  selectOption(event){
    var keys = Object.keys(this.selectedOptions);
    for(var i = 0; i < keys.length; i++)
        this._data.setRequestVal(keys[i], this.selectedOptions[keys[i]]);
  }

  setKey(event){
    if(event.keyCode == 13){
      this._data.setRequestVal('key',event.target.value);
      this.triedKey = true;
    }
  }

  transform_label(str){
    if(typeof str == 'string'){
      var arr = str.split('-');
      for(var i = 0; i < arr.length; i++)
        arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
      return arr.join(' ');
    }
    return str;
  }

  plotChart(){
    var chartSubscription = timer(0, 100).subscribe(t=>{
      if(document.getElementById('canvas')){
        var footerHeight = document.getElementById('footer').offsetHeight;
        document.getElementById('footer').style.marginTop = '-' + footerHeight + 'px';
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.dates,
            datasets: [
              { 
                label: 'Algorithm',
                data: this.algorithm,
                borderColor: this.algorithmColor,
                fill: false
              },
              { 
                label: 'Benchmark (' + this.benchSymb + ')',
                data: this.benchmark,
                borderColor: this.benchmarkColor,
                fill: false
              },
            ]
          },
          options: {
            layout:{
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: footerHeight
            }
            },
            responsive:true,
            legend: {
              display: true,
              position: 'right'
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
        chartSubscription.unsubscribe();
      }
    });
  }
}
