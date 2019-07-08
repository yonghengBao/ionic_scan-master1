import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-password',
  templateUrl: 'set-password.html',
})
export class SetPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }

  //页面跳转
  navigate(page:string):void{
    this.navCtrl.push(page);
  }

  setLoginPsw(){
    this.navCtrl.push("RegisterPage",{type:1})
  }

  setPayPsw(){
    this.navCtrl.push("RegisterPage",{type:2})
  }
}
