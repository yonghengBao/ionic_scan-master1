import { Component, ViewChild } from '@angular/core';
import { NavController,IonicPage,ActionSheetController,AlertController } from 'ionic-angular';
import { SharedDataServiceProvider } from "../../providers/shared-data-service/shared-data-service";
import { App,ViewController } from 'ionic-angular';
import { MeService } from "./MeService";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
// import { LoadingService } from "./../../providers/LoadingService";

@IonicPage()
@Component({
  selector: 'page-homes',
  templateUrl: 'homes.html',
  providers: [FileOpener, FileTransfer, AlertController, MeService]
})
export class HomesPage {
  constructor(public navCtrl: NavController,
              public Share: SharedDataServiceProvider,
              private app:App,
              private fileOpener: FileOpener,
              private transfer: FileTransfer,
              //                  private file: File,
              private alertCtrl: AlertController,
              // private loadingService: LoadingService,
              public actionSheetCtrl: ActionSheetController,
              private meService: MeService,
              public viewCtrl: ViewController) {

  }

  //退出到登录页
  exitTo(){
    this.app.getRootNav().setRoot("LoginPage");
    delete (<any>window).launchURL;
  }


  update() {
    this.meService.getUpdate(false).then(data => {
      console.log(data);
      // 判断当前版本号否大于服务器的版本号
      // var serveVersion = data && data.appList && data.appList.group && data.appList.group.app && data.appList.group.app.version;
      // console.log(serveVersion);
      // console.log(this.Share.appVersion);
      // if (this.versionfunegt(serveVersion, this.Share.appVersion)) {
      if (true) {
        console.log("检查到新版本，是否更新APP");

        let alert1 = this.alertCtrl.create({
          title: '版本更新',
          message: '检查到最新版本，是否进行更新',
          buttons: [
            {
              text: '否',
              role: 'cancel',
              handler: () => {
                console.log('不进行更新');
              }
            },
            {
              text: '是',
              handler: () => {
                console.log('更新APP');
                // var url = data && data.appList && data.appList.group && data.appList.group.app && data.appList.group.app.url;
                var url = 'https%3A%2F%2Fwww.pgyer.com%2Fapiv2%2Fapp%2Fplist%3FappKey%3D600946dc6899528c8a58f89f27f1a9ce%26_api_key%3D52916a3f84e0911a3d57278dc3b1c668'
                console.log(url);
                if (this.Share.platform == 'iOS') {
                  console.log('打开iOS下载地址----------------------------');
                  window.location.href = 'itms-services://?action=download-manifest&url=' + url;
                } else {
                  console.log('开始下载Android代码----------------------------');
                  const fileTransfer: FileTransferObject = this.transfer.create();
                  fileTransfer.onProgress(progressEvent => {
                    var present = new Number((progressEvent.loaded / progressEvent.total) * 100);
                    console.log('当前进度为：' + present.toFixed(0));
                    // var presentInt = presentIntsent.toFixed(0);
                    // this.loadingService.presentProgress(presentInt);
                  });

                  var savePath = this.Share.savePath + 'android.apk';
                  fileTransfer.download(encodeURI(url), savePath).then((entry) => {
                    console.log('保存apk包的地址为: ' + this.Share.savePath + 'Ceshiname.apk');
                    console.log('download complete: ' + entry.toURL());
                    console.log("下载成功");

                    this.fileOpener.open(entry.toURL(), "application/vnd.android.package-archive")
                      .then(() => console.log('打开apk包成功！'))
                      .catch(e => console.log('打开apk包失败！', e));
                  }, (error) => {
                    console.log("下载失败");
                    // this.loadingService.presentTip('操作提醒', '由于部分手机出现异常,请您进入手机设置-应用管理-Ceshiname-权限，将存储权限打开后再进行升级，由此给您带来的不便，敬请谅解。');
                    for(var item in error) {
                      console.log(item + ":" + error[item]);
                    }
                  });
                }
              }
            }
          ]
        });
        alert1.present();
      } else {
        // this.loadingService.presentMsg("已是最新版本！");
      }
    });
  }

  // 比较版本号
  versionfunegt (a, b) {
    var _a = this.toNum(a), _b = this.toNum(b);
    if(_a == _b) {
      console.log("版本号相同！版本号为："+a);
      return false;
    } else if(_a > _b) {
      console.log("版本号"+a+"是新版本！");
      return true;
    } else {
      console.log("版本号"+b+"是新版本！");
      return false;
    }
  }

  toNum (a) {
    var a = a.toString();
    //也可以这样写 var c=a.split(/\./);
    var c = a.split('.');
    var num_place = ["","0","00","000","0000"], r = num_place.reverse();
    for (var i = 0; i< c.length; i++){
      var len = c[i].length;
      c[i] = r[len] + c[i];
    }
    var res = c.join('');
    return res;
  }


  //字体
  changeFont() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '设置字体大小',
      buttons: [
        {
          text: '小',
          role: 'destructive',
          handler: () => {
            // this.Share.fontSize = 'small';
          }
        },
        {
          text: '中',
          handler: () => {
            // this.Share.fontSize = 'normal';
          }
        },{
          text: '大',
          handler: () => {
            // this.Share.fontSize = 'large';
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

}
