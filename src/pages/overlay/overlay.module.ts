import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverlayPage } from './overlay';

@NgModule({
  declarations: [
    OverlayPage,
  ],
  imports: [
    IonicPageModule.forChild(OverlayPage),
  ],
})
export class OverlayPageModule {}
