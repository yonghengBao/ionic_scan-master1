import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChangeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-detail',
  templateUrl: 'change-detail.html',
})
export class ChangeDetailPage {
  items={number:'123456',money:'100.00',type:'0',date:'2018-08-22 12:00:00',balance:'0.00'}
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeDetailPage');
  }

}
