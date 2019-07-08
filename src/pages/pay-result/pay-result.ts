import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pay-result',
  templateUrl: 'pay-result.html',
})
export class PayResultPage {
  resultForm:any = { //可用餐券列表信息
    time:"",
    type:"",
    money:"",
    payer:"",
    payee:"",
    pic:"",
    status:""
  };
  timer;//定时器
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navParams.data.succData
    this.resultForm = {
      time:this.navParams.data.succData.paidTime,
      type:this.navParams.data.succData.ticketName,
      money:this.navParams.data.succData.orderAmount,
      payer:this.navParams.data.succData.memberName,
      payee:this.navParams.data.succData.shopName,
      pic:this.navParams.data.succData.pic,
      status:"1"
    }
    this.setTime();
  }

  ionViewDidLoad() {

  }

  //计时器
  setTime() {
    this.resultForm.time+=1000;
    this.timer = setTimeout(() => {
      this.setTime();
    }, 1000);

  }

  ionViewDidLeave(){
    clearTimeout(this.timer);
    this.timer=null;
  }

  //点击完成回首页
  goHome(){
    this.navCtrl.setRoot("HomePage");
  }
}
