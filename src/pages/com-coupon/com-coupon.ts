import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-com-coupon',
  templateUrl: 'com-coupon.html',
})
export class ComCouponPage {
  @ViewChild('ref') ref:any='';
  tabIndex=0;//显示当前页的下划线
  status:number=1;//餐券状态
  getMore:boolean=true;
  menus=["未使用", "已使用", "已过期"];//tab名
  pageNum:number = 1;//当前页数
  totalPage:number = 0;//总页数
  pageSize:number =10;//每页显示记录数
  finishShow:boolean=false;//加载完成提示是否显示
  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider) {
  }

  ionViewDidLoad() {
    this.scrollGetDataList(1,1,10);//初始显示未使用餐券
  }

  //tab切换
  onTabsChange(i){
    this.getMore=true;
    this.tabIndex=i;
    this.status=i+1;
    this.scrollGetDataList(this.status,1,10);
  }

  //获取餐券
  scrollGetDataList(status,pageNum,pageSize){
    this.base.requestData("GET","/diningTicket/userTicketList?status="+status+"&pageIndex="+pageNum+"&pageSize="+pageSize,(reqData)=>{
      this.pageNum = reqData.data.pageNum;
      this.totalPage = reqData.data.pages;
      if(reqData.data.list && reqData.data.list.length>0){
        let ticketItem ;
        for(var item of reqData.data.list){
          ticketItem ={
            ticketName:item.ticketName,
            timeName:item.timeName,
            startTime:item.startTime,
            useRange:item.useRange,
            ticketItemId:item.ticketItemId,
            memberTicketDetailId:item.memberTicketDetailId,
          };
          if(status==1){//未使用
            this.ref.unTicketList.push(ticketItem);
          }
          if(status==2){//已使用
            this.ref.hadTicketList.push(ticketItem);
          }
          if(status==3){//过期
            this.ref.pastTicketList.push(ticketItem);
          }
        }
      }else { //没有查询的记录
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
      if(this.status==1){
        this.ref.unTicketList=[];
      }else if(this.status==2){
        this.ref.hadTicketList=[];
      }else {
        this.ref.pastTicketList=[];
      }
      this.scrollGetDataList(this.status,1,10);
      refresher.complete();
    }, 2000);
  }
  toApply(){
    this.navCtrl.push("ApplyPage")
  }
}
