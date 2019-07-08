import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBankCardPage } from './my-bank-card';

@NgModule({
  declarations: [
    MyBankCardPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBankCardPage),
  ],
})
export class MyBankCardPageModule {}
