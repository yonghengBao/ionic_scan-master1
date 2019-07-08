import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-choose-coupon',
  templateUrl: 'choose-coupon.html',
})
export class ChooseCouponPage {
  type:string;//上一级页面来至哪个页面；
  couponList:Array<{type:string,tips:string,time:string,money:string}>=[];//可用餐券列表信息
  id:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider ) {
  }

  ionViewDidLoad() {
    this.type = this.navParams.data.type;
    //获取用户当前可用餐券列表
    this.base.requestData("GET","/diningTicket/payWay",(reqData)=>{
      if(reqData.data.length>0){
        let item=null;
        for(let i=0;i<reqData.data.length;i++){
          for(let p of reqData.data[i].memberTicketDetailList){
            item = {
              type:reqData.data[i].ticketName,
              tips:'您有一张面额'+p.ticketMoney+'元的午餐券(消费时段'+p.effectTime+'-'+p.loseTime+')可使用',
              time:'有效期至'+p.loseTime,
              money:p.ticketMoney,
              id:p.id
            }
            this.couponList.push(item);
          }
        }
      }
    });
  }

  //返回选择餐券
  chooseFun(index){
    if(this.type =="1"){
      this.navCtrl.push("ScanResultPage",{couponData:this.couponList[index]});
    }else{
      this.navCtrl.push("PaymentPage",{couponData:index});
    }
  }
}
