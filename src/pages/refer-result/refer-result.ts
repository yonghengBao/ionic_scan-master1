import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-refer-result',
  templateUrl: 'refer-result.html',
})
export class ReferResultPage {
  word:string="已提交申请"
  toggle:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams){
    if(this.navParams.get("type")==1){
      this.word="已提交申请";
      this.toggle=true;
    }else{
      this.word="退款申请已提交"
      this.toggle=false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferResultPage');
  }

  //页面跳转
  navigate(page:string){
    this.navCtrl.push(page);
  }

}
