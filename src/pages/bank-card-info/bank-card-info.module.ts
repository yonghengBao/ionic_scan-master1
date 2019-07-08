import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankCardInfoPage } from './bank-card-info';

@NgModule({
  declarations: [
    BankCardInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BankCardInfoPage),
  ],
})
export class BankCardInfoPageModule {}
