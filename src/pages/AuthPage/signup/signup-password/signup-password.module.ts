import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPasswordPage } from './signup-password';

@NgModule({
  declarations: [
    SignupPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPasswordPage),
  ],
})
export class SignupPasswordPageModule {}
