import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
   pwShow:boolean = false;
   tel:string;
   code:string;
   upwd:string;
   placeholder:string="设置登录密码";
   title:string="用户注册";
   get: any = {
     tips: "获取验证码",
     times: 60,
     disabled: true//是否可以点击获取验证码
   }
   timer;//计时器
  constructor(public navCtrl: NavController, public navParams: NavParams,public base:BaseServiceProvider,private storage:Storage) {
    //判断跳转页
    if(this.navParams.get("type")==0){
      this.title="用户注册"
      this.placeholder="设置登录密码";
    }else if(this.navParams.get("type")==1){
      this.title="登录密码重置"
      this.placeholder="输入新的登录密码";
    }else if(this.navParams.get("type")==2){
      this.title="支付密码重置"
      this.placeholder="输入新的支付密码";
    }else if(this.navParams.get("type")==3){
      this.title="忘记密码"
      this.placeholder="输入新的登录密码";
    }
  }

  //验证手机号为正确，则获取验证码按钮可点
  handleChange($event) {
    this.get.tips="获取验证码";
    clearTimeout(this.timer);
    if(!this.base.regPhone.test(this.tel)){
      this.get.disabled = true;
    }
    else{
      this.get.disabled = false;
    }
  }

  telBlue(){
    if(!this.base.regPhone.test(this.tel)){
      this.base.toast("请输入正确的手机号码","bottom");
    }
  }

  //获取验证码
  getCode(){
    if(this.navParams.get("type")==0){
      this.base.requestParamData("GET","/checkMobile",{"mobile":this.tel},(reqData)=>{
        this.base.requestParamData("GET","/mobile/code",{"mobile":this.tel},(reqData)=>{
          this.base.toast("发送成功","bottom")
          console.log("收到的验证码是："+reqData.data.verifyCode)
        });
        this.get.tips=this.get.times + "s后重发";
        this.get.disabled = true;
        this.setTime();
      })
    }else{
      this.base.requestParamData("GET","/mobile/code",{"mobile":this.tel},(reqData)=>{
        this.base.toast("发送成功","bottom")
        console.log("收到的验证码是："+reqData.data.verifyCode)
      });
      this.get.tips=this.get.times + "s后重发";
      this.get.disabled = true;
      this.setTime();
    }
  }

  //重发验证码倒计时
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

  //提交
  sureBtn(){
    //console.log(this.tel)
    if(!this.base.regPhone.test(this.tel)){
      this.base.toast("请输入正确的手机号码","bottom");
      return;
    }
    if(!this.code){
      this.base.toast("请输入验证码","bottom");
      return;
    }
    if(!this.base.regPassward.test(this.upwd)){
      this.base.toast("密码6~16位数字和字母组合","bottom");
      return;
    }
    var regForm = {
      tel: this.tel,
      validCode: this.code,
      regpsw: this.upwd,
    }
    var changeForm = {
      "newPsw": this.upwd,
      "mobile": this.tel,
      "verCode": this.code
    }
    //注册
    if(this.navParams.get("type")==0){
      this.base.showLoading("处理中...");
      this.base.requestParamData("POST","/register",regForm,(reqData)=>{
        this.base.hideLoading();
        this.storage.set('id',reqData.data.id);
        this.navCtrl.push('IdentityPage');
      });
    }
    //登录密码重置
    else if(this.navParams.get("type")==1){
      this.base.showLoading("处理中...");
      this.base.requestParamData("POST","/changePassword",changeForm,(reqData)=>{
        this.base.toast("密码重置成功","bottom");
        this.navCtrl.setRoot("LoginPage");
      });
    }
    //支付密码重置
    else if(this.navParams.get("type")==2){
      console.log("修改支付密码");
    }
    //忘记密码
    else if(this.navParams.get("type")==3){
      this.base.showLoading("处理中...");
      this.base.requestParamData("POST","/forgetPassword",changeForm,(reqData)=>{
        this.base.toast("密码重置成功","bottom");
        this.navCtrl.setRoot("LoginPage");
      });
    }
  }
  //点击回车注册或修改密码
  focusInput(){
    var idInput=document.getElementById("reg");
    idInput.onkeyup=(event)=>{
      if(event.keyCode==13){
        this.sureBtn();
      }
    }
  }
}
