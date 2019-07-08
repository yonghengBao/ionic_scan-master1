import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-apply-refund',
  templateUrl: 'apply-refund.html',
})
export class ApplyRefundPage {
  refundMoney:string;
  picUrl:string;
  reason:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider) {
  }
  
  goRefundResult(){
    var refundForm = {
      orderId: this.navParams.data.orderId,
      refundReason: this.reason,
    }
    this.base.requestParamData("POST","/order/createPaymentRefund",refundForm,(reqData)=>{
      console.log(reqData);
      this.navCtrl.push("ReferResultPage",{type:"2"});
    })
   
  }

}
