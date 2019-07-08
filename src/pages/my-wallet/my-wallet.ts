import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-my-wallet',
  templateUrl: 'my-wallet.html',
})
export class MyWalletPage implements OnInit{
  totalAccount:number=0;//总金额
  salaryAccount:number=0;//工资账户
  balanceAccount:number=0;//余额账户
  rechargeAccount:number=0;//充值赠送

  constructor(public navCtrl: NavController, public navParams: NavParams, private base:BaseServiceProvider) {
  }

  ionViewDidLoad() {
  }

  //页面初始化
  ngOnInit(){
    //获取账户余额
    this.base.requestData("GET","/accountBalance/accountBalanceInfo",(reqData)=>{
      if(reqData.data){
        this.totalAccount = reqData.data.totalAccount;
        this.salaryAccount = reqData.data.salaryAccount;
        this.balanceAccount = reqData.data.balanceAccount;
        this.rechargeAccount = reqData.data.rechargeAccount;
      }
    })
  }

  //页面跳转
  navigate(page:string):void{
    this.navCtrl.push(page);
  }

}
