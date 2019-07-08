import { Component ,OnInit } from '@angular/core';
import { IonicPage , NavController ,MenuController } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';
import { ImgServiceProvider } from '../../providers/base-service/img-service';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  userUrl:string = "assets/icon/person.png";
  userName:string = "游客";
  page: Array<{title: string, component: any,ionicname: string}>;
  newStatusList:any=[];
  mealHistoryList:Array<{"createdTime":string,"content":string}> = [];
  timeList:Array<{"name":string,"start":string,"end":string}> = [];
  pageNum:number;//当前页数
  pages:number;//总页数
  finishShow:boolean=false;//加载完成提示是否显示
  infiniteShow:boolean=true;//上拉组件是否显示
  private initImgSer() {
    this.imgSer.uploadApi = '.....';
    this.imgSer.upload.success= (data)=> {
      console.log(data)
      this.base.toast(data.data.url,"bottom")
      //this.doctorData.avatar = data.data.url;
    };
    this.imgSer.upload.error= (err)=> {
      console.log("上传失败")
      //this.toastSer.showToast('上传失败');
    };
  }
  constructor(public navCtrl: NavController,private storage:Storage,private base:BaseServiceProvider,public menuCtrl: MenuController ,private imgSer:ImgServiceProvider) {
    this.storage.get('userData').then((val) => {
      if(val){
        if(val.name){
          this.userName = val.name;
        }
        if(val.PicUrl){
          this.userUrl = val.PicUrl;
        }
        if(val.type=="1"){
          this.page = [
            { "title": '身份绑定', "component": "IdentityPage","ionicname":"man" },
            { "title": '我的钱包', "component": "MyWalletPage","ionicname":"briefcase" },
            { "title": '消费订单', "component": "ComOrderListPage","ionicname":"reorder" },
            { "title": '我的银行卡', "component": "MyBankCardPage" ,"ionicname":"card"}
          ];
        }else if(val.type.indexOf("2")!=-1){
          this.page = [
            { "title": '我是商家', "component": "SellerPage","ionicname":"bookmark" },
            { "title": '我的钱包', "component": "MyWalletPage","ionicname":"briefcase" },
            { "title": '消费订单', "component": "ComOrderListPage","ionicname":"reorder" },
            { "title": '我的银行卡', "component": "MyBankCardPage" ,"ionicname":"card"}
          ];
        }else{
          this.page = [
            { "title": '我的钱包', "component": "MyWalletPage","ionicname":"briefcase" },
            { "title": '消费订单', "component": "ComOrderListPage","ionicname":"reorder" },
            { "title": '我的银行卡', "component": "MyBankCardPage" ,"ionicname":"card"}
          ];
        }
      }
    });
  }

  //页面初始化
  ngOnInit(){
    //获取用餐时段
    this.base.requestData("GET","/diningTicket/getAllTicketTime",(reqData)=>{
      let timeItem = null;
      for(var p of reqData.data){
        timeItem = {"name":p.timeName,"start":p.startTime,"end":p.endTime};
        this.timeList.push(timeItem);
      }
    })
    //获取初始最新动态
    this.getNewStatusList();
    //获取初始用餐历史
    this.getMealHistoryList(1,10);
  }

  ionViewDidEnter() {
    this.menuCtrl.close();
  }

  //页面跳转
  navigate(page:string):void{
    if(page=="LoginPage"){
      this.storage.remove("userData");
      this.navCtrl.push("LoginPage",{type:1});
    }else {
    this.navCtrl.push(page);
    }
  }

  //获取最新动态
  getNewStatusList(){
    this.base.requestData("GET","/campus/memberOperationDynamics/getCurrent?page=1&pageSize=5",(reqData)=>{
      this.newStatusList=reqData.data.list;
    });
  }

  //获取用餐历史方法
  getMealHistoryList(pageIndex,pageSize){
    this.base.requestData("GET","/campus/mealsHistory/getCurrent?page="+pageIndex+"&pageSize="+pageSize,(reqData)=>{
      if(reqData.data.list.length>0){
        this.pageNum = reqData.data.pageNum;
        this.pages = reqData.data.pages;
        let item = null;
        for(var p of reqData.data.list){
          item = {"createdTime":p.createdTime,"content":p.content};
          this.mealHistoryList.push(item)
        }
      }
    });
  }

  ionViewDidLoad() {
  }

  // 下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      this.infiniteShow=true;
      //清空最新动态和用餐历史
      this.newStatusList = [];
      this.mealHistoryList = [];
      //刷新最新动态
      this.getNewStatusList();
      //刷新用餐历史
      this.getMealHistoryList(1,10);
      refresher.complete();
    }, 2000);
  }
  //更换图像
  avatarChoice() {
    this.initImgSer();
    this.imgSer.showPicActionSheet();
  }
  //上拉加载数据
  doInfinite(infiniteScroll){
    setTimeout(()=>{
      if(this.pageNum<this.pages){
        this.getMealHistoryList(this.pageNum+1,10)
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
