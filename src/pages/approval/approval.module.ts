import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApprovalPage } from './approval';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(ApprovalPage),
    ComponentsModule
  ],
})
export class ApprovalPageModule {}
