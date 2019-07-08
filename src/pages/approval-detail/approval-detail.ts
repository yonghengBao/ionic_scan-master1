import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service'

@IonicPage()
@Component({
  selector: 'page-approval-detail',
  templateUrl: 'approval-detail.html',
})
export class ApprovalDetailPage {
  approvalId:string;
  items:Array<{date:string,time:string,type:string,company:string,name:string,state:string}> = [];
  userList:Array<{company:string,userName:string}>=[];//用餐人员列表

  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.approvalId = this.navParams.data.approvalId;
    let item = null;
    //获取审批详情
    this.base.requestData("GET","/diningTicket/getTicketApplyDetial?id="+this.approvalId,(reqData)=> {
      if(reqData.data.detailList.length>0){
        item ={
          date:reqData.data.useDate,
          time:reqData.data.tiemName,
          type:reqData.data.ticketName,
          state:reqData.data.status
        }
        let companyList = reqData.data.detailList[0].companyName.split(",");
        let nameList = reqData.data.detailList[0].customerName.split(",");
        let userList = [];
        let userItem;
        for(var i=0;i<companyList.length-1;i++){
          userItem= {company:companyList[i],userName:nameList[i]}
          userList.push(userItem);
        }
        this.userList = userList;
      } else{
        item ={
          date:reqData.data.useDate,
          time:reqData.data.tiemName,
          type:reqData.data.ticketName,
          state:reqData.data.status
        }
      }
      this.items.push(item);
    });
  }

  setStatu (statu) {
    this.base.showLoading("审批中...");
    this.base.requestData("POST",'/diningTicket/updateStatus?status='+statu+'&id='+this.approvalId,(reqData)=>{
      if(statu==1){
        this.base.toast('已同意申请','bottom');
      }else{
        this.base.toast('已退回申请','bottom');
      }
      setTimeout(()=>{
        this.navCtrl.push("ApprovalPage");
      },2000)
    });
  }

  //同意
  agreeFun(){
    this.setStatu(1);
  }

  //退回弹出框
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: '退回理由',
      inputs: [
        {
          name: 'reason',
          placeholder: '请输入退回理由'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            if(!data.reason){
              this.base.toast("退回理由不能为空","bottom");
              return;
            }else{
              this.setStatu(2);
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
