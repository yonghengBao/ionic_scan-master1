import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';


@IonicPage()
@Component({
  selector: 'page-order-list-detail',
  templateUrl: 'order-list-detail.html',
})
export class OrderListDetailPage implements OnInit{
  detail:Object={"name":"","realPay":"","shouldPay":"","ticket":"","payMethod":"","explain":"","time":"","id":"","status":""};//订单详情参数
  status:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider) {
  }

  ngOnInit(){
    let orderId = this.navParams.data.orderId;
    //获取消费订单详情
      this.base.requestData("GET", "/order/selectMyOrder/detail/" + orderId, (reqData)=> {
        this.detail = {
          name: reqData.data.businessName,
          realPay: reqData.data.paidByOnline,
          shouldPay:reqData.data.orderAmount,
          ticket:reqData.data.paidByVoucher,
          payMethod:reqData.data.paymentMethod,
          explain:reqData.data.paymentRemark,
          time: this.base.DateFormatter(reqData.data.paymentConfirmTime),
          id: reqData.data.orderId,
          status: reqData.data.orderStatus
        };
        if(reqData.data.orderStatus=='6'){
          this.status='申请退款'
        }else if(reqData.data.orderStatus=='7'){
          this.status='退款中'
        }else if(reqData.data.orderStatus=='8'){
          this.status='退款成功'
        }else if(reqData.data.orderStatus=='9'){
          this.status='退款失败'
        }else if(reqData.data.orderStatus=='10'){
          this.status='交易成功'
        }
    });
  }
  navigate(page:string,id:string){
    this.navCtrl.push(page,{orderId:id})
  }
}
