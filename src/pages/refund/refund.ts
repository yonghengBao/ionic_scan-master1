import { Component ,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';
@IonicPage()
@Component({
  selector: 'page-refund',
  templateUrl: 'refund.html',
})
export class RefundPage implements OnInit{
  list:Object={"money":'',"reason":'',"status":''};
  status:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider) {
  }

  ngOnInit(){
    let orderId = this.navParams.data.orderId;
    //获取退款详情
    this.base.requestData("GET", "/order/paymentRefund/selectPaymentRefundDetail/" + orderId, (reqData)=> {
      console.log(reqData);
      this.list={
        money:reqData.data.refundAmount,
        reason:reqData.data.refundReason,
        status:reqData.data.refundStatus
      }
      if(reqData.data.refundStatus=='1'){
        this.status='处理中'
      }else if(reqData.data.refundStatus=='2'){
        this.status='退款中'
      }else if(reqData.data.refundStatus=='3'){
        this.status='退款成功'
      }else if(reqData.data.refundStatus=='4'){
        this.status='退款失败'
      }else {
        this.status='驳回'
      }
    });
  }
}
