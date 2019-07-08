import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeDetailPage } from './change-detail';

@NgModule({
  declarations: [
    ChangeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeDetailPage),
  ],
})
export class ChangeDetailPageModule {}
