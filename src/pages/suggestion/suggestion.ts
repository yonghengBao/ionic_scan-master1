import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {
  wordval:string="";
  sugNum:number=0;
  id:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private storage:Storage,
              public base:BaseServiceProvider ) {
    this.storage.get('userData').then((val) => {
      this.id=val.id;
    });
  }

  ionViewDidLoad() {

  }

  word(){
    var txtval=this.wordval.length;
    this.sugNum = txtval;
  }

  sugBtn(){
    if(this.wordval==''){
      this.base.toast("请输入您的意见","bottom")
      return false;
    }
    var sugForm = {
       id:this.id,
       content:this.wordval
    }
    this.base.requestParamData("POST","/submitSuggestion?content="+this.wordval,sugForm,(reqData)=>{
      this.base.toast("提交成功","bottom")
      this.wordval="";
      this.sugNum=0;
    });
  }

}
