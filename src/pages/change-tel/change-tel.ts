import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-change-tel',
  templateUrl: 'change-tel.html',
})
export class ChangeTelPage {
  //question:boolean = false;
  can:boolean = false;
  cannot:boolean = true;
  newTel:boolean = true;
  success:boolean = true;
  oldTel:string;//当前绑定手机号
  params = {tel: ''}//新输入绑定手机号
  resend: any = {tips: "重新发送", times: 60, disabled: false};//重发验证码
  get: any = {tips: "获取验证码", times: 60, disabled: true}//获取验证码
  canCode:string;//能接收短信验证码
  timer;//计时器
  newTelCode;//更改手机号验证码

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

  goLoginPage(){
    this.navCtrl.setRoot("LoginPage");
  }

  ////点击能接收短信，自动发送验证码到手机
  //canFun(){
  //  this.can=false;
  //  this.question=true;
  //  this.base.requestParamData("GET","/mobile/code",{"mobile":this.oldTel},(reqData)=>{
  //    this.base.toast("发送成功","bottom")
  //    console.log("收到的验证码是："+reqData.data.verifyCode)
  //  });
  //}

  //能接收短信点击下一步
  canNextFun(){
    this.base.requestParamData("GET","/checkVerifyCode",{"mobile":this.oldTel,verCode:this.canCode},(reqData)=>{
      this.newTel=false;
      this.can=true;
    });
  }

  //重新发送
  resendCode() {
    this.base.requestParamData("GET","/mobile/code",{"mobile":this.oldTel},(reqData)=>{
      this.base.toast("发送成功","bottom")
      console.log("收到的验证码是："+reqData.data.verifyCode)
    });
    this.resend.tips=this.resend.times + "s后重发";
    this.resend.disabled = true;
    this.resetTime();
  }

  //重发验证码倒计时
  resetTime() {
    if (this.resend.times == 1) {
      this.resend.times = 60;
      this.resend.tips = "重发验证码";
      this.resend.disabled = false;
      return;
    } else {
      this.resend.times--;
    }

    this.resend.tips = this.resend.times + "s后重发";
    setTimeout(() => {
      this.resend.tips = this.resend.times + "s后重发";
      this.resetTime();
    }, 1000);
  }

  ////不能接受短信
  //cannotFun(){
  //  this.cannot=false;
  //  this.question=true;
  //}
  //
  ////能接收短信点击下一步
  //cannotNextFun(){
  //  this.newTel=false;
  //  this.cannot=true;
  //}

  //验证手机号为正确，则获取验证码按钮可点
  handleChange($event) {
    this.get.tips="获取验证码";
    clearTimeout(this.timer);
    if(!this.base.regPhone.test(this.params.tel)){
      this.get.disabled = true;
    }
    else{
      this.get.disabled = false;
    }
  }

  //绑定手机号发送验证码
  getCode() {
    this.base.requestParamData("GET","/mobile/code",{"mobile":this.params.tel},(reqData)=>{
      this.base.toast("发送成功","bottom")
      console.log("收到的验证码是："+reqData.data.verifyCode)
    });
    //发送验证码成功后开始倒计时
    this.get.disabled = true;
    this.setTime();
  }

  //发送验证码倒计时
  setTime() {
    if (this.get.times == 1) {
      this.get.times = 60;
      this.get.tips = "重发验证码";
      this.get.disabled = false;
      return;
    } else {
      this.get.times--;
    }
    this.get.tips = this.get.times + "s后重发";
    this.timer = setTimeout(() => {
      this.get.tips = this.get.times + "s后重发";
      this.setTime();
    }, 1000);
  }

  //更改绑定手机号
  newTelNext(){
    if(!this.params.tel) {
      this.base.toast("请输入手机号","bottom")
      return;
    }
    if(!this.newTelCode) {
      this.base.toast("请输入验证码","bottom")
      return;
    }
    this.base.requestParamData("GET","/changeMobile",{"mobile":this.params.tel,verCode:this.newTelCode},(reqData)=>{
      this.success=false;
      this.newTel=true;
    });
  }
}
