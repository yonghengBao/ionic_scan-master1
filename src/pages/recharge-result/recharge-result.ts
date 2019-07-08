import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RechargeResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge-result',
  templateUrl: 'recharge-result.html',
})
export class RechargeResultPage {
  state='2';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargeResultPage');
  }

  //页面跳转
  navigate(page:string):void{
    this.navCtrl.push(page);
  }

}
