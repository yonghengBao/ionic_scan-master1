import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApprovalDetailPage } from './approval-detail';

@NgModule({
  declarations: [
    ApprovalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ApprovalDetailPage),
  ],
})
export class ApprovalDetailPageModule {}
