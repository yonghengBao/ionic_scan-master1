import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RechargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {
  show:boolean=true;
  isOutline:boolean=true;
  id:string="0";
  moneyList=[
    {"num":"100"},
    {"num":"200"},
    {"num":"300"},
    {"num":"400"},
    {"num":"500"},
    {"num":"600"}
  ];
  popShow:boolean=true;
  popShow1:boolean=true;
  popShow2:boolean=true;
  cardList=[
    { "icon": '1', "name": "中国工商银行","type":"尾号1234储蓄卡","number":"**** **** **** 1111" },
    { "icon": '2', "name": "中国农业银行","type":"尾号1234储蓄卡","number":"**** **** **** 2222" },
    { "icon": '3', "name": "中国银行","type":"尾号1234储蓄卡","number":"**** **** **** 3333" },

  ];
  cardName = "中国工商银行";
  cardType = "尾号1234储蓄卡";
    companyList=[
    "托普学院",
    "天一学院",
    "希望学院"
  ];
  company = "托普学院";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargePage');
  }

  //页面跳转
  navigate(page:string):void{
    this.navCtrl.push(page);
  }

  isOutlineFun(index){
    this.id=index;
    this.show=true;
    console.log(this.id);
  }
  customFun(){
    this.show=false;
    this.id="-1";
  }

  wayChoose(cardName:string,cardType:string){
    this.popShow1=true;
    this.cardName = cardName;
    this.cardType = cardType;
  }

  companyChoose(company:string){
    this.popShow2=true;
    this.company = company;
  }

}
