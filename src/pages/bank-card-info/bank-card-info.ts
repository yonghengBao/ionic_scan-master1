import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BankCardInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank-card-info',
  templateUrl: 'bank-card-info.html',
})
export class BankCardInfoPage {
  savingsCardInfo:boolean;//是否为添加储蓄卡
  cardType='信用卡';
  typeList=[
    '身份证',
    '护照',
    '学生证',
    '教师证'
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //type=0为添加银行卡，type=1为仅支持储蓄卡
    if(this.navParams.get("type")==0){
      this.savingsCardInfo=false;
    }else if(this.navParams.get("type")==1){
      this.savingsCardInfo=true;
    }
  }

  ionViewDidLoad() {
  }
}
