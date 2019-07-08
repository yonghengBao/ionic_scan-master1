import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChooseBankCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-bank-card',
  templateUrl: 'choose-bank-card.html',
})
export class ChooseBankCardPage {
  cardList:Array<{icon: string, name: any,type: string,number:string}>=[
    { "icon": '1', "name": "中国工商银行","type":"尾号1111储蓄卡","number":"**** **** **** 1111" },
    { "icon": '2', "name": "中国农业银行","type":"尾号2222储蓄卡","number":"**** **** **** 2222" },
    { "icon": '3', "name": "中国银行","type":"尾号3333储蓄卡","number":"**** **** **** 3333" },

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  //页面跳转
  navigate(page:string,type:string):void{
    this.navCtrl.push(page,type);
  }


  //返回选择餐券
  chooseFun(index){
    //console.log(this.cardList[index])
    this.navCtrl.push("CashPage",{cardData:this.cardList[index]});
  }

}
