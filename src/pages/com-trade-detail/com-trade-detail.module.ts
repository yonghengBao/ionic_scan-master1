import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComTradeDetailPage } from './com-trade-detail';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ComTradeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ComTradeDetailPage),
    ComponentsModule
  ],
})
export class ComTradeDetailPageModule {}
