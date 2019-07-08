import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBankCardPage } from './add-bank-card';

@NgModule({
  declarations: [
    AddBankCardPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBankCardPage),
  ],
})
export class AddBankCardPageModule {}
