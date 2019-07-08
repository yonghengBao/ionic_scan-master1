import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'order-history-all',
  templateUrl: 'order-history-all.html'
})
export class OrderHistoryAllComponent {
  allHistoryList=[
    {
      name:'18300000000',
      money:'10',
      time:'2018-08-27 12:22:00',
      state:'交易成功',
      type:'0'
    },
    {
      name:'18311111111',
      money:'20',
      time:'2018-08-27 13:22:00',
      state:'交易成功',
      type:'0'
    },
    {
      name:'18322222222',
      money:'30',
      time:'2018-08-27 14:22:00',
      state:'退款成功',
      type:'1'
    }
  ];
  noData:boolean=false;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 
  

}
