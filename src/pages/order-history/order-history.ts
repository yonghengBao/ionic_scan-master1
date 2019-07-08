import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {
  chooseMonth:boolean=true;//是否按月选择
  chooseDate:string;//按月选择的年月
  year;//按月选择的年
  month;//按月选择的月
  startTime="开始日期";//按日选择开始日期
  startYear;//按日选择开始的年
  startMonth;//按日选择开始的月
  startDay;//按日选择开始的日
  endTime="结束日期";//按日选择结束日期
  endYear;//按日选择结束的年
  endMonth;//按日选择结束的月
  endDay;//按日选择结束的日
  @ViewChild('ref') ref:any='';
  tabIndex=0;//显示当前页的下划线
  status:number=1;//餐券状态
  getMore:boolean=true;
  finishShow:boolean=false;//加载完成提示是否显示
  menus=["全部", "已结算", "未结算"];//tab名
  pageNum:number = 1;//当前页数
  totalPage:number = 0;//总页数
  pageSize:number =10;//每页显示记录数
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //获取当前年月
    this.chooseDate=new Date().getFullYear()+"-"+(new Date().getMonth()+1 < 10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1);
    this.year=new Date().getFullYear();
    this.month=new Date().getMonth()+1 < 10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
    console.log("当前年"+this.year);
    console.log("当前月"+this.month);
    //获取当前年月日
    this.startTime=new Date().getFullYear()+"-"+(new Date().getMonth()+1 < 10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1)+"-"+(new Date().getDate() < 10 ? '0' + (new Date().getDate()) : new Date().getDate());
    this.startYear=new Date().getFullYear();
    this.startMonth=new Date().getMonth()+1 < 10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
    this.startDay=new Date().getDate() < 10 ? '0' + (new Date().getDate()) : new Date().getDate();
    console.log("当前开始年"+this.startYear);
    console.log("当前开始月"+this.startMonth);
    console.log("当前开始日"+this.startDay);

  }

  //获取选择的年月
  getChooseDate(){
    this.year = this.chooseDate.split("-")[0];
    this.month = this.chooseDate.split("-")[1];
    console.log("年"+this.year);
    console.log("月"+this.month);
    //this.getCashRecord(this.month,this.year);
  }

  //获取选择开始的年月日
  getStartTime(){
    this.startYear = this.startTime.split("-")[0];
    this.startMonth = this.startTime.split("-")[1];
    this.startDay = this.startTime.split("-")[2];
    console.log("开始年"+this.startYear);
    console.log("开始月"+this.startMonth);
    console.log("开始日"+this.startDay);
    //this.getCashRecord(this.month,this.year);
  }

  //获取选择结束的年月日
  getEndTime(){
    this.endYear = this.endTime.split("-")[0];
    this.endMonth = this.endTime.split("-")[1];
    this.endDay = this.endTime.split("-")[2];
    console.log("结束年"+this.endYear);
    console.log("结束月"+this.endMonth);
    console.log("结束日"+this.endDay);
    //this.getCashRecord(this.month,this.year);
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
    //   this.base.requestData("GET","/diningTicket/userTicketList?status="+status+"&pageIndex="+pageNum+"&pageSize="+pageSize,(reqData)=>{
    //     if(reqData.data.list && reqData.data.list.length>0){
    //       let ticketItem ;
    //       for(var item of reqData.data.list){
    //         ticketItem ={
    //           ticketName:item.ticketName,
    //           timeName:item.timeName,
    //           startTime:item.startTime,
    //           useRange:item.useRange,
    //           ticketItemId:item.ticketItemId,
    //           memberTicketDetailId:item.memberTicketDetailId,
    //         };
    //         if(status==1){//全部
    //           this.ref.allHistoryList.push(ticketItem);
    //         }
    //         if(status==2){//已结算
    //           this.ref.settledHistoryList.push(ticketItem);
    //         }
    //         if(status==3){//未结算
    //           this.ref.unsettledHistoryList.push(ticketItem);
    //         }
    //       }
    //       this.pageNum = reqData.data.pageNum;
    //       this.totalPage = reqData.data.pages;
    //     }else { //没有查询都记录
    //      this.ref.noData=true;
    //     }
    //   })
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
        this.ref.allHistoryList=[];
      }else if(this.status==2){
        this.ref.settledHistoryList=[];
      }else {
        this.ref.unsettledHistoryList=[];
      }
      this.scrollGetDataList(this.status,1,10);
      refresher.complete();
    }, 2000);
  }
}
