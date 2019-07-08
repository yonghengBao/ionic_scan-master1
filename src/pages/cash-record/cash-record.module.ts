import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashRecordPage } from './cash-record';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    CashRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(CashRecordPage),
    ComponentsModule,
  ],
})
export class CashRecordPageModule {}
