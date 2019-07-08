import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

/**
 * Generated class for the AddBankCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-bank-card',
  templateUrl: 'add-bank-card.html',
})
export class AddBankCardPage {
  savingsCardInfo:boolean;//是否为添加储蓄卡
  bankName='';
  bankNum = '';
  disabled:boolean = true;
  type:string;//0为添加银行卡，1为仅支持储蓄卡


  constructor(public navCtrl: NavController, public navParams: NavParams, public base:BaseServiceProvider) {
    this.type=this.navParams.get("type");
    //添加银行卡
    if(this.navParams.get("type")==0){
      this.savingsCardInfo=false;
    }
    //只能添加储蓄卡
    else if(this.navParams.get("type")==1){
      this.savingsCardInfo=true;
    }
  }

  ionViewDidLoad() {
  }

  //验证银行卡号正确，下一步按钮可点
  handleChange($event) {
    //添加银行卡时判断卡号是否正确
    if(this.type=="0"){
      if(this.base.regBankCard.test(this.bankNum)){
        this.disabled = false;
      }else {
        this.disabled = true;
      }
    }
    //只能添加储蓄卡时判断持卡人姓名不为空和卡号是否正确
    else if(this.type=="1"){
      if(this.bankName !="" && this.base.regBankCard.test(this.bankNum)){
        this.disabled = false;
      }else {
        this.disabled = true;
      }
    }
  }

  //页面跳转
  navigate(page:string,type:string):void{
    this.navCtrl.push(page,type);
  }

}
