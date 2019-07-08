import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-apply-detail',
  templateUrl: 'apply-detail.html',
})
export class ApplyDetailPage {
  items:Array<{date:string,time:string,type:string,company:string,name:string,state:string}> = [];
  userList:Array<{company:string,userName:string}>=[];//用餐人员列表
  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider) {
  }

  ionViewDidLoad() {
    let applyCouponId = this.navParams.data.applyCouponId;
    let item = null;
    //获取餐券详情信息
    this.base.requestData("GET","/diningTicket/getTicketApplyDetial?id="+applyCouponId,(reqData)=>{
      if(reqData.data.detailList.length>0){
        item ={
          date:reqData.data.useDate,
          time:reqData.data.tiemName,
          type:reqData.data.ticketName,
          state:reqData.data.status
        };
        let companyList = reqData.data.detailList[0].companyName.split(",");
        let namaeList = reqData.data.detailList[0].customerName.split(",");
        let userList = [];
        let userItem;
        for(var i=0;i<companyList.length-1;i++){
          userItem= {company:companyList[i],userName:namaeList[i]}
          userList.push(userItem);
        }
        this.userList = userList;
      } else{
        item ={
          date:reqData.data.useDate,
          time:reqData.data.tiemName,
          type:reqData.data.ticketName,
          state:reqData.data.status
        }
      }
      this.items.push(item)
    })
  }
}
