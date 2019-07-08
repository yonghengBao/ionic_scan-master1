import { BrowserModule } from '@angular/platform-browser';//浏览器模块
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'; //本地存储
import { HttpClientModule } from "@angular/common/http";//网络请求模块
import { FormsModule } from "@angular/forms";//表单模块
import { QRScanner} from '@ionic-native/qr-scanner';//扫一扫模块
import { Device} from '@ionic-native/device';//获取用户设备相关参数模块
import { AppVersion} from '@ionic-native/app-version';//获取应用版本
import { ImagePicker } from '@ionic-native/image-picker';//选择图片
import { FileTransfer,  FileTransferObject }from'@ionic-native/file-transfer';//上传图片
import { File } from '@ionic-native/file';//文件操作
import { Camera } from '@ionic-native/camera';//调用相机
import { JPush } from '@jiguang-ionic/jpush';//极光推送

import { MyApp } from './app.component';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BaseServiceProvider } from '../providers/base-service/base-service';//基础服务
import { ImgServiceProvider } from '../providers/base-service/img-service';//上传图片服务
import {ComponentsModule} from "../components/components.module";
import { SharedDataServiceProvider } from '../providers/shared-data-service/shared-data-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'',
      //modalEnter: 'modal-slide-in',
      //modalLeave: 'modal-slide-out'
    }),
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Device,
    AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BaseServiceProvider,
    Camera,
    ImagePicker,
    File,
    FileTransferObject,
    FileTransfer,
    ImgServiceProvider,
    JPush,
    SharedDataServiceProvider
  ]
})

export class AppModule {

}
