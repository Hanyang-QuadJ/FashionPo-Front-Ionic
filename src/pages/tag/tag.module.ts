import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TagPage } from './tag';
import {OrderModule} from 'ngx-order-pipe';

@NgModule({
  declarations: [
    TagPage,
  ],
  imports: [
    IonicPageModule.forChild(TagPage),OrderModule,
  ],
})
export class TagPageModule {}
