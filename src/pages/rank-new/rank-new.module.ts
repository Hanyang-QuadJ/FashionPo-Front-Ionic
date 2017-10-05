import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankNewPage } from './rank-new';

@NgModule({
  declarations: [
    RankNewPage,
  ],
  imports: [
    IonicPageModule.forChild(RankNewPage),
  ],
})
export class RankNewPageModule {}
