import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-cash',
  templateUrl: 'cash.html',
})
export class CashPage {
  extractIcon:string;//银行图标
  extractBank:string;//银行名称
  extractCardnum:string;//银行卡号
  cardInfo:any={"icon":"","name":"","type":"","number":"" };//银行卡信息
  balanceAccount:number=0;//可提现余额
  salaryAccount:number=0;//可提现工资余额
  balance:number;//输入余额提现金额
  salary:number;//输入工资提现金额
  allMoney:number=0;//输入合计提现金额
  remarkBal:string;//输入余额备注
  remarkSal:string;//输入工资备注
  checkedBal:boolean=false;//是否勾选余额
  checkedSal:boolean=false;//是否勾选工资
  voList:Array<{"accountType","extractAmount","extractBank","extractCardnum","remark"}>=[];//提现信息

  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider) {
    if(this.navParams.get("cardData")){
      this.cardInfo = this.navParams.get("cardData");
      this.extractIcon = this.cardInfo.icon;
      this.extractBank = this.cardInfo.name;
      this.extractCardnum = this.cardInfo.number;
    }else {
      this.extractIcon="1";
      this.extractBank="中国工商银行";
      this.extractCardnum="6212262201023557228";
    }
  }

  ionViewDidLoad() {
    //获取账户余额
    this.base.requestData("GET","/accountBalance/accountBalanceInfo",(reqData)=>{
      if(reqData.data){
        this.salaryAccount = reqData.data.salaryAccount;//可提现工资余额
        this.balanceAccount = reqData.data.balanceAccount;//可提现余额
      }
    })
  }

  //余额全部提现
  balAll(){
    this.balance=this.balanceAccount;
    this.getMoney();
  }

  //工资全部提现
  salAll(){
    this.salary=this.salaryAccount;
    this.getMoney();
  }

  //计算总金额
  getMoney(){
    var bal = this.balance;//余额
    var sal = this.salary;//工资
    //若余额未输入，设置为0
    if(bal==undefined){
      bal=0
    }
    //若工资未输入，设置为0
    if(sal==undefined){
      sal=0
    }
    if(this.checkedBal && this.checkedSal){
      this.allMoney=Number(bal)+Number(sal);
    }else if(!this.checkedBal && this.checkedSal){
      this.allMoney=sal;
    }else if(this.checkedBal && !this.checkedSal){
      this.allMoney=bal;
    }else if(!this.checkedBal && !this.checkedSal){
      this.allMoney=0;
    }
  }

  //页面跳转
  navigate(page:string):void{
    this.navCtrl.push(page);
  }

  //确认提现
  confirmCash(){
    if(this.balance > this.balanceAccount){
      this.base.toast("输入的余额提现金额超出可提现余额","bottom");
      return
    }
    if(this.salary > this.salaryAccount){
      this.base.toast("输入的工资提现金额超出可提现余额","bottom");
      return
    }
    if(this.allMoney==0){
      this.base.toast("请勾选并输入提现金额","bottom");
      return
    }

    //提现信息
    if(this.checkedBal && this.balance){
      let balList={
        "accountType": 1,//提现账户
        "extractAmount": this.balance,//提现金额
        "extractBank": this.extractBank,//提现银行
        "extractCardnum": this.extractCardnum,//提现账号
        "remark": this.remarkBal//备注
      }
      this.voList.push(balList);
    }

    if(this.checkedSal && this.salary){
      let salList={
        "accountType": 2,//提现账户
        "extractAmount": this.salary,//提现金额
        "extractBank": this.extractBank,//提现银行
        "extractCardnum": this.extractCardnum,//提现账号
        "remark": this.remarkSal//备注
      }
      this.voList.push(salList);
    }
    this.base.showLoading("提交中...");
    this.base.requestParamData("POST","/extract/saveExtractRecord",this.voList,(reqData)=>{
      this.navCtrl.push("ReferResultPage",{type:'1'});
    })
  }
}
