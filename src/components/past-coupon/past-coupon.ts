import { Component } from '@angular/core';
import { App , NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'past-coupon',
  templateUrl: 'past-coupon.html'
})
export class PastCouponComponent {
  pastTicketList:Array<{//餐券相关属性
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
    this.app.getRootNav().push("CouponDetailPage",{ticketType:3,ticketItemId:ticketItemId,memberTicketDetailId:memberTicketDetailId});
  }
}
