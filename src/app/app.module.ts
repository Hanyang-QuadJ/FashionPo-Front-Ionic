import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { NativeStorage } from '@ionic-native/native-storage';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { CommentPage } from '../pages/comment/comment';
import { LoginPage } from '../pages/login/login';
import { PlaygroundPage } from '../pages/playground/playground';
import { RegisterPage } from '../pages/register/register';

// import { HttpWithTokenProvider } from '../providers/http-with-token/http-with-token';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { IonicStorageModule } from '@ionic/storage';
import {TabsPage} from "../pages/tabs/tabs";



@NgModule({
  declarations: [
    MyApp,
    CommentPage,
    LoginPage,
    PlaygroundPage,
    RegisterPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CommentPage,
    LoginPage,
    PlaygroundPage,
    RegisterPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
