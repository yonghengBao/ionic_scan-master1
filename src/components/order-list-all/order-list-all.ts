import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';

@Component({
  selector: 'order-list-all',
  templateUrl: 'order-list-all.html'
})
export class OrderListAllComponent {
  allOrderList:Array<{name:string,money:string,time:string,status:string,id:string}> = [];
  noData:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App) {
  }
  //点击进入详情页面
  goDetail(id:string){
    this.app.getRootNav().push("OrderListDetailPage",{orderId:id});
  }
}
