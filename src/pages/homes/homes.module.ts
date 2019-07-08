import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomesPage } from './homes';

@NgModule({
  declarations: [
    HomesPage,
  ],
  imports: [
    IonicPageModule.forChild(HomesPage),
  ],
})
export class HomesPageModule {}
