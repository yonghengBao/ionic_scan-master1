import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-scan-result',
  templateUrl: 'scan-result.html',
})
export class ScanResultPage {
  money:string;
  id:string;//订单id
  orderAmount:any="";//订单总额
  paymentMethod:number;//支付方式:1-餐券支付 2-支付宝支付 3-微信支付 ,
  voucherId:string ;//餐券id
  merchantName:string ;//商家名称
  couponList:Array<{ //可用餐券列表信息
    tips:string,
    id:string
  }>=[];
  placeholderName:string;//可使用餐券数
  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider,public loadingCtrl: LoadingController) {
    //this.money=this.navParams.get("money");
  }
  ionViewDidLoad() {
     let scanResultList = this.navParams.data.scanResult.split(",");
    //let scanResultList = ["business","37e46592203a4f30bb4cce662c5bfdc3","91a24bbebaba42c6b6eb01a2ed801751"];
    if(scanResultList[0]!="business"){
      this.base.toast("请扫描正确的商家二维码","bottom");
      return;
    }
    let formData = {
      "merchantId": scanResultList[2],
      "shopId": scanResultList[1]
    }
    //获取用户当前可用餐券列表
    this.base.requestData("GET","/diningTicket/payWay",(reqData)=>{
      if(reqData.code=="000000"){
        //this.voucherId = reqData.data[0].memberTicketDetailList[0].id;
        if(reqData.data.length>0){
          let item=null;
          for(let i=0;i<reqData.data.length;i++){
            for(let p of reqData.data[i].memberTicketDetailList){
              item = {
                tips:reqData.data[i].ticketName+'('+p.ticketMoney+'元)'+'有效期：'+p.effectTime+'-'+p.loseTime,
                id:p.id
              }
              this.couponList.push(item);
            }
          }
          this.placeholderName = this.couponList.length+"张可用";
        }
      }else{
        this.base.toast(reqData.msg,"bottom");
      }
    });
    //获取商家信息
    this.base.requestData("GET","/business/getBusinessById?id="+scanResultList[1],(reqData)=>{
      this.merchantName = reqData.data.name;
    });
    //获得订单id
    this.base.requestParamData("POST","/order/createOrderWaiting2Paid",formData,(reqData)=>{
      this.id = reqData.data.id;
    });
  }
  //选择餐券
  choseTicket(){
    this.paymentMethod = 1;
  }

  //确认支付
  sureBtn(){
    if(this.orderAmount=="") {
      this.base.toast("请输入支付金额", "bottom");
      return;
    }else if(!this.base.regMoney.test(this.orderAmount)){
      this.base.toast("请输入正确格式的金额","bottom");
      return;
    }
    if(!(this.paymentMethod)){
      this.base.toast("请选择支付方式","bottom");
      return;
    }
    let formData = {
      "id": this.id,
      "orderAmount": this.orderAmount,
      "paymentMethod": this.paymentMethod,
      "voucherId": this.voucherId
    };
    //确认支付
    this.base.showLoading("支付中...");
    this.base.requestParamData("POST","/order/comfirm/paid",formData,(reqData)=>{
      this.base.toast("支付成功","bottom");
      setTimeout(()=>{
        this.navCtrl.push("PayResultPage",{succData:reqData.data});
      },2000);
    });
  }
  //页面跳转
  navigate(page:string):void{
    if(page == "ChooseCouponPage"){
      this.navCtrl.push(page,{type:"1"});
    }else{
      this.navCtrl.push(page);
    }
  }
}
