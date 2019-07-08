import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-cash-record',
  templateUrl: 'cash-record.html',
})
export class CashRecordPage implements OnInit{
  page:number;//当前页码
  pageSize:number;//总页数
  finishShow:boolean=false;//加载完成提示是否显示
  infiniteShow:boolean=true;//上拉组件是否显示
  noData:boolean=false;//无数据组件是否显示
  cashList:Array<{accountType,extractAmount,extractBank,applyDate,extractStatus}> = [];//提现记录列表
  status:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private base:BaseServiceProvider) {
  }

  ionViewDidLoad() {
  }

  //页面初始化
  ngOnInit(){
    //获取提现记录
    this.getCashRecord(1,10);
  }

  //获取提现记录
  getCashRecord(page,pageSize){
    this.base.requestData("GET","/extract/getExtractRecord?page="+page+"&pageSize="+pageSize,(reqData)=>{
      this.cashList = [];
      if(reqData.data.list && reqData.data.list.length>0){
        for(var tmp of reqData.data.list){
          let item = {
            "accountType": tmp.accountType,//提现账户
            "extractAmount": tmp.extractAmount,//提现金额
            "extractBank": tmp.extractBank,//提现银行
            "applyDate": tmp.applyDate,//提现时间
            "extractStatus":tmp.extractStatus,//提现状态
          };
          if(item.extractStatus==1){
            this.status="待审核"
          }else if(item.extractStatus==2){
            this.status="审核通过"
          }else if(item.extractStatus==3){
            this.status="审核拒绝"
          }else if(item.extractStatus==4){
            this.status="打款通过"
          }else if(item.extractStatus==5){
            this.status="打款拒绝"
          }else if(item.extractStatus==6){
            this.status="打款成功"
          }else if(item.extractStatus==7){
            this.status="打款失败"
          }
          this.cashList.push(item);
        }
      }else{
        this.noData=true;
      }
    })
  }

  // 下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      this.infiniteShow=true;
      //清空提现记录
      this.cashList = [];
      //刷新提现记录
      this.getCashRecord(1,10);
      refresher.complete();
    }, 2000);
  }

  //上拉加载数据
  doInfinite(infiniteScroll){
    setTimeout(()=>{
      if(this.page<this.pageSize){
        this.getCashRecord(this.page+1,10)
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


  //页面跳转
  navigate(page:string):void{
    this.navCtrl.push(page);
  }

}
