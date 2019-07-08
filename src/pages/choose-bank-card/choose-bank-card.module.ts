import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseBankCardPage } from './choose-bank-card';

@NgModule({
  declarations: [
    ChooseBankCardPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseBankCardPage),
  ],
})
export class ChooseBankCardPageModule {}
