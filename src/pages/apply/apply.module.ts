import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyPage } from './apply';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyPage),
    ComponentsModule
  ],
})
export class ApplyPageModule {}
