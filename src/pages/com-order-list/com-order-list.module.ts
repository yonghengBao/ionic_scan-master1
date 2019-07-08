import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComOrderListPage } from './com-order-list';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ComOrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(ComOrderListPage),
    ComponentsModule
  ],
})
export class ComOrderListPageModule {}
