import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { BaseServiceProvider } from '../../providers/base-service/base-service';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-identity',
  templateUrl: 'identity.html',
})
export class IdentityPage {
  name:string="";
  idCard:string;
  id:string;
  isSkip:boolean;
  loginPage;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl:AlertController,
              public base:BaseServiceProvider,
              private storage:Storage) {
  this.loginPage=LoginPage;
    this.storage.get('userData').then((val) => {
      if(val==null){
        this.storage.get('id').then((val) => {
          this.isSkip=true;//显示跳过
          this.id=val;
        });
      }else{
        this.id=val.id;
        this.isSkip=false;//不显示跳过
      }
    });
  }
  ionViewDidLoad() {

  }
  skip(){
    let alert = this.alertCtrl.create({
      title: '确认跳过',
      subTitle: '确认跳过身份绑定吗？',
      buttons: [
      {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel');
        }
      },
      {
        text: '确定',
        handler: () => {
          this.navCtrl.push('LoginPage');
        }
      }
    ]
  });
    alert.present();
  }
  sureBtn(){
    if(this.name==""){
      this.base.toast("请输入真实姓名","bottom");
      return;
    }else if(!this.base.regID.test(this.idCard)){
      this.base.toast("请输入正确的身份证号码","bottom");
      return;
    }
    var indentityForm = {
      id: this.id,
      idCard: this.idCard,
      name: this.name
    }
    this.base.showLoading("处理中...");
    this.base.requestParamData("POST","/bindingUser",indentityForm,(reqData)=>{
      this.base.toast("绑定成功","bottom")
      this.navCtrl.push('LoginPage');
    });
  }

  //点击回车身份绑定
  focusInput(){
    var idInput=document.getElementById("sure");
    idInput.onkeyup=(event)=>{
      if(event.keyCode==13){
        this.sureBtn();
      }
    }
  }
}
