import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComCouponPage } from './com-coupon';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ComCouponPage,
  ],
  imports: [
    IonicPageModule.forChild(ComCouponPage),
    ComponentsModule
  ],
})
export class ComCouponPageModule {}
