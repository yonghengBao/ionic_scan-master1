import { Component } from '@angular/core';
import { App , NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'un-coupon',
  templateUrl: 'un-coupon.html'
})
export class UnCouponComponent {

  unTicketList:Array<{//餐券相关属性
    ticketName:string,
    timeName:string,
    startTime:string,
    useRange:string,
    ticketItemId:string,
    memberTicketDetailId:string,
  }> = [];
  noData:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams ,private app:App) {

  }

  //点击进入详情页面
  toTicketDetail(ticketItemId:string,memberTicketDetailId:string){
    this.app.getRootNav().push("CouponDetailPage",{ticketType:1,ticketItemId:ticketItemId,memberTicketDetailId:memberTicketDetailId});
  }


}
