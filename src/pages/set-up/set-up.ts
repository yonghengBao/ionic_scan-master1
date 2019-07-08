import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-set-up',
  templateUrl: 'set-up.html',
})
export class SetUpPage {
  oldTel;//当前绑定手机号
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public base:BaseServiceProvider) {
    //获取当前登录手机号
    this.storage.get('tel').then((val) => {
      if(val){
        this.oldTel = val;
      }
    });
  }
  ionViewDidLoad() {
  }

  //页面跳转
  navigate(page:string):void{
    this.navCtrl.push(page);
  }

  goChangeTelPage(){
    this.base.requestParamData("GET","/mobile/code",{"mobile":this.oldTel},(reqData)=>{
      console.log("收到的验证码是："+reqData.data.verifyCode)
    });
    this.navCtrl.push("ChangeTelPage");
  }
}
