import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-com-order-list',
  templateUrl: 'com-order-list.html',
})
export class ComOrderListPage {
  @ViewChild('ref') ref:any='';
  tabIndex=0;//显示当前页的下划线
  status;//餐券状态
  getMore:boolean=true;
  finishShow:boolean=false;//加载完成提示是否显示
  menus=["全部", "已完成", "退款"];//tab名
  pageNum:number = 1;//当前页数
  totalPage:number = 0;//总页数
  pageSize:number =10;//每页显示记录数
  constructor(public navCtrl: NavController, public navParams: NavParams ,private base:BaseServiceProvider) {
  }

  ionViewDidLoad() {
    this.scrollGetDataList('7,8,9,10',1,10);//初始显示全部订单
  }

  //tab切换
  onTabsChange(i){
    this.getMore=true;
    this.tabIndex=i;
    if(this.tabIndex==0){
      this.status='7,8,9,10'; //退款中，退款成功 ，退款失败/交易成功
    }else if(this.tabIndex==1){
      this.status=10;  //交易成功
    }else{
      this.status='7,8,9';//退款中,退款成功,退款失败
    }
    this.scrollGetDataList(this.status,1,10);
  }

  //获取订单列表
  scrollGetDataList(orderStatus,pageNum,pageSize){
     this.base.requestData("GET","/order/selectMyOrder/page?orderStatus="+orderStatus+"&page="+pageNum+"&pageSize="+pageSize,(reqData)=>{
       if(reqData.data.list && reqData.data.list.length>0){
         let ticketItem ;
         for(var item of reqData.data.list){
          ticketItem ={
            name:item.businessName,
            money:item.paidByOnline,
            time:this.base.DateFormatter(item.paymentConfirmTime),
            status:item.orderStatus,
            id:item.orderId,
          };
          if(this.tabIndex==0){//全部
            this.ref.allOrderList.push(ticketItem);
          }
          if(this.tabIndex==1){//已完成
            this.ref.finishedOrderList.push(ticketItem);
          }
          if(this.tabIndex==2){//退款
            this.ref.refundOrderList.push(ticketItem);
          }
         }
         this.pageNum = reqData.data.pageNum;
         this.totalPage = reqData.data.pages;
       }else { //没有查询都记录
         this.ref.noData=true;
       }
     })
  }
  //上拉加载数据
  doInfinite(infiniteScroll){
    setTimeout(()=>{
      if(this.pageNum<this.totalPage){
        this.pageNum++;
        this.scrollGetDataList(this.status,this.pageNum,this.pageSize);
      }else{
        this.finishShow=true;
        setTimeout(()=>{
          this.finishShow=false;
        },2000);//2秒后已到底提示消失
        this.getMore=false;
      }
      infiniteScroll.complete();
    },2000);
  }

  // 下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      this.getMore=true;
      if(this.tabIndex==0){
        this.ref.allOrderList=[];
      }else if(this.tabIndex==1){
        this.ref.finishedOrderList=[];
      }else {
        this.ref.refundOrderList=[];
      }
      this.scrollGetDataList(this.status,1,10);
      refresher.complete();
    }, 2000);
  }
}
