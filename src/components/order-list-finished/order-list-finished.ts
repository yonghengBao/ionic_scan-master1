import { Component } from '@angular/core';
import { NavController, NavParams ,App} from 'ionic-angular';

@Component({
  selector: 'order-list-finished',
  templateUrl: 'order-list-finished.html'
})
export class OrderListFinishedComponent {
  finishedOrderList:Array<{name:string,money:string,time:string,status:string}> = [];
  noData:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App) {
  }
  //点击进入详情页面
  goDetail(id:string){
    this.app.getRootNav().push("OrderListDetailPage",{orderId:id});
  }

}
