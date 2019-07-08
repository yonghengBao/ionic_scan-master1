import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BaseServiceProvider } from '../../providers/base-service/base-service';
import { JPush } from '@jiguang-ionic/jpush';

//import { Device } from '@ionic-native/device';
//import { AppVersion } from '@ionic-native/app-version';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  pwShow:boolean = false;
  myAppName:any = "web-app";//应用名称
  deviceCode:any = "d9bf62aa340a4265";//设备code
  myVersionNumber:any ="0.0.1" ;//应用版本
  userSystem:any = "Android";//客户端系统类型
  systemVersion:any = "5.1";//客服端系统版本
  registrationId:string = "asdfghj";//极光推送的id
  devicePlatform: string = "Android";//用户设备类型
  rId:string = "123456";
  userParams = {
    mobile:'',
    pwd:''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private storage:Storage,
    //private device: Device,
    //private appVersion: AppVersion,
    private jPush: JPush,
    public toastCtrl:ToastController,
    public base:BaseServiceProvider ) {
    if(this.navParams.get("type")==1){
      this.navCtrl.setRoot("LoginPage");
    }
  }

  ionViewDidLoad() {
    //获取设备的相关信息
    //this.deviceCode = this.device.uuid;
    //this.userSystem = this.device.platform;
    //this.systemVersion = this.device.version;
    //this.appVersion.getAppName().then( (appName)=>{
    //  alert(appName)
    //  this.myAppName = appName;
    //})
    //this.appVersion.getVersionNumber().then((versionNumber) =>{
    //  alert(versionNumber)
    //  this.myVersionNumber = versionNumber;
    //})
    //this.descript =`系统uui是:${this.device.uuid} ;系统版本是:${this.device.version} ;操作系统名称:${this.device.platform} ;产品名称是:${this.device.model}`
    //极光推送
    document.addEventListener(
      "jpush.receiveNotification",
      (event: any) => {
        var content;
        if (this.devicePlatform == "Android") {
          content = event.alert;
        } else {
          content = event.aps.alert;
        }
        this.base.toast(content,"bottom");
        alert("Receive notification: " + JSON.stringify(event));
      },
      false
    );
    document.addEventListener(
      "jpush.openNotification",
      (event: any) => {
        var content;
        if (this.devicePlatform == "Android") {
          content = event.alert;
        } else {
          // iOS
          if (event.aps == undefined) {
            // 本地通知
            content = event.content;
          } else {
            // APNS
            content = event.aps.alert;
          }
        }
        this.base.toast(content,"bottom");
        alert("open notification: " + JSON.stringify(event));
      },
      false
    );
    document.addEventListener(
      "jpush.receiveLocalNotification",
      (event: any) => {
        // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
        var content;
        if (this.devicePlatform == "Android") {
        } else {
          content = event.content;
        }
        this.base.toast(content,"bottom");
        alert("receive local notification: " + JSON.stringify(event));
      },
      false
    );
  }
  //获取极光id
  getRegistrationID() {
    this.jPush.getRegistrationID().then(rId => {
      if(!rId){
        rId="aaa"
      }else{
        rId+="bbb"
      }
      this.registrationId = rId;
    });
  }
  showToast():void{
    var toast=this.toastCtrl.create({
      message:'请输入手机号',
      duration:2000
    });
    toast.present();
  }


  telBlue(){
    if(this.userParams.mobile==""){
      this.base.toast("请输入手机号码","bottom");
      return;
    }
    if(!this.base.regPhone.test(this.userParams.mobile)){
      this.base.toast("请输入正确的手机号码","bottom");
      return;
    }
  }
  home1(){ this.navCtrl.push("HomesPage",{type:0})}
  login():void{
    if(this.userParams.mobile==""){
      this.base.toast("请输入手机号码","bottom");
      return;
    }
    if(this.userParams.pwd==""){
      this.base.toast("请输入密码","bottom");
      return;
    }
    //加载动画
    this.base.showLoading("登录中...");
    const headers = new HttpHeaders().set("Accept","application/json;charset=UTF-8")
    // .set('x-user-token',this.deviceCode)
    // .set('x-device-code',this.deviceCode)
    // .set('x-client-appName',this.myAppName)
    // .set('x-client-appVersion',this.myVersionNumber)
    // .set('x-client-system',this.userSystem)
    // .set('x-client-systemVersion',this.systemVersion)
    // .set('x-registration-id',this.registrationId);
    this.http.request("POST","http://182.140.221.106:12219/login",{body:this.userParams,headers:headers}).subscribe((resData:any)=>{
      this.base.hideLoading();
      if(resData.code=="000000"){
        this.storage.set('userData',resData.data);
        this.storage.set('tel',this.userParams.mobile);//存入当前登录手机号
        this.navCtrl.setRoot('HomePage');
      }else{
        var toast=this.toastCtrl.create({
          message:resData.msg,
          duration:2000
        });
        toast.present();
      }
    },(err)=>{
      console.log("ERROR",err)
    })

  }
  //去注册
  goRegister(){
    this.navCtrl.push("RegisterPage",{type:0})
  }
  //去设置密码
  forgetLoginPsw(){
    this.navCtrl.push("RegisterPage",{type:3})
  }

  //点击回车登录
  focusInput(){
    var idInput=document.getElementById("goHome");
    idInput.onkeyup=(event)=>{
      if(event.keyCode==13){
        this.login();
      }
    }
  }
}
