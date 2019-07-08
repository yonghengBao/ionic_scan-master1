import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'order-history-settled',
  templateUrl: 'order-history-settled.html'
})
export class OrderHistorySettledComponent {
  settledHistoryList=[
    {
      name:'18300000000',
      money:'10',
      time:'2018-08-27 12:22:00',
      state:'交易成功',
      type:'0',
    }
  ]
  noData:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
