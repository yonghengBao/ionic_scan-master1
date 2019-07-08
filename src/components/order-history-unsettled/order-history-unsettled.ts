import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'order-history-unsettled',
  templateUrl: 'order-history-unsettled.html'
})
export class OrderHistoryUnsettledComponent {
  unsettledHistoryList=[
    {
      name:'18311111111',
      money:'20',
      time:'2018-08-27 13:22:00',
      state:'交易成功',
      type:'1'
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
