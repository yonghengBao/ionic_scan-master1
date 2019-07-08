import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service'

@IonicPage()
@Component({
  selector: 'page-approval',
  templateUrl: 'approval.html',
})
export class ApprovalPage {
  pageNum:number;
  pages:number;
  finish:string;
  items:Array<{"type":string,"name":string,"date":string,"id":string,"tips":string}> = [];
  finishShow:boolean=false;//加载完成提示是否显示
  infiniteShow:boolean=true;//上拉组件是否显示
  noData:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider) {
  }

  ionViewDidLoad() {
    //页面加载时获取审批列表
    this.getDataList(1,12);
  }

  //获取审批列表
  getDataList(page,pageSize){
    this.base.requestData("GET", "/diningTicket/getLeaderApplyList?pageIndex="+page+"&pageSize="+pageSize,(reqData)=> {
      if(reqData.data.list.length>0){
        this.pageNum = reqData.data.pageNum;
        this.pages = reqData.data.pages;
        let approvalList = null;
        for (var p of reqData.data.list) {
          approvalList = {"type":p.ticketName,"name":p.applyName,"date":p.createDate,"id":p.id,"tips":p.status,};
          this.items.push(approvalList);
        }
      }else {
        this.noData=true;
      }
    });
  }

  //页面跳转
  navigate(page:string,id:string):void{
    this.navCtrl.push(page,{approvalId:id});
  }

  // 下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      this.infiniteShow=true;
      this.finishShow=false;
      this.items=[];
      this.getDataList(1,12);
      refresher.complete();
    }, 2000);
  }

  // 上拉加载更多
  doInfinite(infiniteScroll){
    setTimeout(()=>{
      if(this.pageNum<this.pages){
        this.getDataList(this.pageNum+1,12)
      }else{
        this.finishShow=true;
        //infiniteScroll.enable(false);
        this.infiniteShow=false;
      }
      infiniteScroll.complete();
    },2000);
  }
}
