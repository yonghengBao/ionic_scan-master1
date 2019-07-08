import { Component } from '@angular/core';
import { App , NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'had-coupon',
  templateUrl: 'had-coupon.html'
})
export class HadCouponComponent{

  hadTicketList:Array<{ticketName:string,timeName:string,startTime:string,useRange:string,ticketItemId:string,memberTicketDetailId:string,}> = [];//餐券相关属性
  noData:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app:App) {

  }

  //点击进入详情页面
  toTicketDetail(ticketItemId:string,memberTicketDetailId:string){
    this.app.getRootNav().push("CouponDetailPage",{ticketType:2,ticketItemId:ticketItemId,memberTicketDetailId:memberTicketDetailId});
  }



}
