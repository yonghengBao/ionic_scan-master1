import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service'

@IonicPage()
@Component({
  selector: 'page-seller',
  templateUrl: 'seller.html',
})
export class SellerPage {
  money:number;//商家收支
  pageSize:number;//每一页数据个数
  pageNum:number;//当前页数
  pages:number;//总页数
  items:Array<{"time":string,"name":string,"amount":string}> = [];
  finishShow:boolean=false;//加载完成提示是否显示
  infiniteShow:boolean=true;//上拉加载更多是否显示

  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider) {
  }

  //初始化页面
  ionViewDidLoad() {
    this.getCount();
    this.getDataList(1,13);
  }
  //商家收支统计
  getCount(){
    this.base.requestData("GET", "/campus/businessIncome/order/count", (reqData)=> {
      this.money = reqData.data.money
    });
  }
  //商家收支信息
  getDataList(page,pageSize){
    this.base.requestData("GET", "/campus/businessIncome/order/businessIncome?page="+page+"&pageSize="+pageSize,(reqData)=> {
      if(reqData.data.list.length>0){
        this.pageNum = reqData.data.pageNum;
        this.pages = reqData.data.pages;
        let sellerList = null;
        for (var p of reqData.data.list) {
          sellerList = {"time": p.createdTime, "name": p.memberName, "amount": p.amount};
          this.items.push(sellerList);
        }
      }
    });
  }

  //页面跳转
  navigate(page:string):void{
    this.navCtrl.push(page);
  }

  // 下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      this.infiniteShow=true;
      this.finishShow=false;
      this.money=null;
      this.getCount();
      this.items=[];
      this.getDataList(1,13);
      refresher.complete();
    }, 2000);
  }

  // 上拉加载更多
  doInfinite(infiniteScroll){
    setTimeout(()=>{
      if(this.pageNum<this.pages){
        this.getDataList(this.pageNum+1,13)
      }else{
        this.finishShow=true;
        this.infiniteShow=false;
      }
      infiniteScroll.complete();
    },2000);
  }
}
