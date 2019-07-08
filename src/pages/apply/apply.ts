import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
})
export class ApplyPage {
  pageNum:number;//当前页
  pageSize:number;//每页显示记录数
  total:number;//总数
  endRow:number;//当前页结尾数
  items:Array<{name:string,tips:string,date:string,approver:string,id:string}> = [];//申请的餐券相关属性
  finishShow:boolean=false;//加载完成提示是否显示
  infiniteShow:boolean=true;//上拉组件是否显示
  noData:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider) {

  }

  //页面跳转
  navigate(page:string,id:string):void{
    this.navCtrl.push(page,{applyCouponId:id});
  }

  ionViewDidLoad() {
    //页面加载是获取用户申请列表
    this.getApplyList(1,13);
  }

  //获取用户申请列表
  getApplyList(pageNum,pageSize){
    this.base.requestData("GET", "/diningTicket/getTicketApplyList?pageIndex="+pageNum+"&pageSize="+pageSize, (reqData)=> {
      if(reqData.data.list.length>0){
        this.pageNum = reqData.data.pageNum;
        this.total=reqData.data.total;
        this.endRow=reqData.data.endRow;
        for(var tmp of reqData.data.list){
          var item = {name:tmp.ticketName,tips:tmp.status,date:tmp.createDate,approver:tmp.applyName,id:tmp.id};
          this.items.push(item);
        }
      }else {
        this.noData=true;
      }
    });
  }

  // 下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      this.infiniteShow=true;
      //清空申请列表
      this.items = [];
      //刷新申请列表
      this.getApplyList(1,13);
      refresher.complete();
    }, 2000);
  }

  //上拉加载数据
  doInfinite(infiniteScroll){
    setTimeout(()=>{
      if(this.endRow<this.total){
        this.getApplyList(this.pageNum+1,13);
      }else{
        this.finishShow=true;
        setTimeout(()=>{
          this.finishShow=false;
        },2000);//2秒后已到底提示消失
        this.infiniteShow=false;
      }
      infiniteScroll.complete();
    },2000);
  }
}
