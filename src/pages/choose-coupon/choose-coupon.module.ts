import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseCouponPage } from './choose-coupon';

@NgModule({
  declarations: [
    ChooseCouponPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseCouponPage),
  ],
})
export class ChooseCouponPageModule {}
