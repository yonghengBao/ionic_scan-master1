import { Component ,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-coupon-detail',
  templateUrl: 'coupon-detail.html',
})
export class CouponDetailPage implements OnInit{
  ticketForm:Object={"type":"","name":"","date":""};//餐券详情参数
  useRange:string;
  business:string; //餐券指定商家的Id
  ticketType:number;
  itemId:string;//餐券id
  memberTicketDetailId:string;//用户餐券详情的id
  constructor(public navCtrl: NavController, public navParams: NavParams ,private base:BaseServiceProvider) {

  }

  ngOnInit(){
    this.memberTicketDetailId = this.navParams.data.memberTicketDetailId;
    this.itemId = this.navParams.data.ticketItemId;
    this.ticketType = this.navParams.data.ticketType;
    //获取餐券详情
    this.base.requestData("GET","/diningTicket/ticketDetial?itemId="+this.itemId+"&memberTicketDetailId="+this.memberTicketDetailId,(reqData)=>{
      this.ticketForm = {
        type:reqData.data.ticketName,
        name:reqData.data.timeName,
        date:reqData.data.startTime +"一"+reqData.data.endTime
      };
      this.business = reqData.data.business;
      //判断使用范围
      if(reqData.data.useRange=="1"){
        this.useRange = "仅限于 "+reqData.data.name+" 使用";
      }else if(reqData.data.useRange=="2"){
        this.useRange = "仅限于某类商家可用";
      }else {
        this.useRange = "通用券";
      }
    })
  }

  goScan(){
    if(this.ticketType==1){
      this.navCtrl.push("ScanPage");
    }
  }
}
