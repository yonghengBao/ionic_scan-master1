import { Component, ViewChild} from '@angular/core';
import { Platform, ToastController, Nav, IonicApp} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { SharedDataServiceProvider } from "../providers/shared-data-service/shared-data-service";
import { File } from '@ionic-native/file';
import { Device } from '@ionic-native/device';


import { Storage } from '@ionic/storage';


declare var cordova: any;
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any ;



  constructor(
    private device: Device,
    public ionicApp: IonicApp,
    private appVersion: AppVersion,
    private file: File,
    public platform: Platform,
    public statusBar: StatusBar,
    public toastCtrl: ToastController,
    public splashScreen: SplashScreen,
    private Share: SharedDataServiceProvider,
    public storage:Storage
  ) {
    this.initializeApp();
    this.storage.get('userData').then((val) => {
      if(val){
        //this.nav.setRoot("AddApplyPage")
        this.nav.setRoot("HomePage")
      }else{
        this.nav.setRoot("LoginPage")
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /*储存版本信息及判断存储路径开始*/
      // 读取所用的平台
      //获取当前平台信息   this.device.platform
      this.appVersion.getVersionNumber().then(data => {
        //当前app版本号  data，存储该版本号
        this.Share.appVersion = data;
      }, error => console.error(error => {
        //获取当前版本号失败进行的操作
      }));
      this.appVersion.getPackageName().then(data => {
        //当前应用的packageName：data，存储该包名
        this.Share.packageName = data;
      }, error => console.error(error => {
        //获取该APP id 失败
      }));

      this.Share.platform = this.device.platform;
      this.Share.savePath = this.Share.platform == 'iOS' ? this.file.documentsDirectory : this.file.externalDataDirectory;
      //存储的沙盒地址：this.Share.savePath



      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  //提示弹窗
  alertToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      cssClass:'detailToast',
      duration: 2000
    });
    toast.present();
  }





}
