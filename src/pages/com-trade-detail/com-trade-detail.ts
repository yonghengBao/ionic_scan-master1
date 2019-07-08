import { Component , OnInit , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-com-trade-detail',
  templateUrl: 'com-trade-detail.html',
})
export class ComTradeDetailPage implements OnInit {
  @ViewChild('ref') ref:any='';//'ref'指代调用子组件时指定的#ref
  menus=["全部","收入","支出"];//tab菜单名
  tabIndex=0;//显示当前页的下划线
  type:number=0;//显示tab的序数
  getMore:boolean=true;//上拉加载更多组件是否显示
  finishShow:boolean=false;//加载完成提示是否显示
  page:number = 1;//当前页数
  totalPage:number;//总页数
  pageSize:number;//每页显示记录数

  constructor(public navCtrl: NavController, public navParams: NavParams, private base:BaseServiceProvider) {
  }

  ionViewDidLoad() {
  }

  //页面初始化
  ngOnInit(){
    this.getAccountBalanceLog(0,1,10);
  }

  //获取余额变动记录
  getAccountBalanceLog(type,page,pageSize){
    this.base.requestData("GET","/accountBalance/accountBalanceLog?type="+type+"&page="+page+"&pageSize="+pageSize,(reqData)=>{
      this.page = reqData.data.pageNum;
      this.totalPage = reqData.data.pages;
      this.pageSize = reqData.data.pageSize;
      if(reqData.data.list && reqData.data.list.length>0){
        for(var p of reqData.data.list){
          let item ={
            detail:p.detail,
            createDate:p.createDate,
            totalAmount:p.totalAmount,
            type:p.type,
            amount:p.amount
          };
          if(type==0){//全部
            this.ref.allList.push(item);
          }
          if(type==1){//收入
            this.ref.incomeList.push(item);
          }
          if(type==2){//支出
            this.ref.costList.push(item);
          }
        }
      }else {
        this.ref.noData=true;
      }
    })
  }

  //tab切换
  onTabsChange(i){
    this.getMore=true;
    this.tabIndex=i;
    this.type=i;
    this.getAccountBalanceLog(this.type,this.page,this.pageSize);
  }

  //上拉加载数据
  doInfinite(infiniteScroll){
    setTimeout(()=>{
      if(this.page<this.totalPage){
        this.page++;
        this.getAccountBalanceLog(this.type,this.page,this.pageSize);
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
      if(this.type==0){
        this.ref.allList=[];
      }else if(this.type==1){
        this.ref.incomeList=[];
      }else {
        this.ref.costList=[];
      }
      this.getAccountBalanceLog(this.type,this.page,this.pageSize);
      refresher.complete();
    }, 2000);
  }

}
