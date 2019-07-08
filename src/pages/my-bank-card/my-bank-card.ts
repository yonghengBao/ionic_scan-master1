import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyBandCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bank-card',
  templateUrl: 'my-bank-card.html',
})
export class MyBankCardPage {
  tag="快捷支付"
  cardList=[
    { "icon": '1', "name": "中国工商银行","type":"储蓄卡","number":"**** **** **** 1111" },
    { "icon": '2', "name": "中国农业银行","type":"储蓄卡","number":"**** **** **** 2222" },
    { "icon": '3', "name": "中国银行","type":"储蓄卡","number":"**** **** **** 3333" },

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  //页面跳转
  navigate(page:string,type:string):void{
    this.navCtrl.push(page,type);
  }

}
