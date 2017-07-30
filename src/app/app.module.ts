import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

// import { NativeStorage } from '@ionic-native/native-storage';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {VotePage} from '../pages/vote/vote';
import {LoginPage} from '../pages/login/login';
import {PlaygroundPage} from '../pages/playground/playground';
import {RegisterPage} from '../pages/register/register';
import {MyrankPage} from '../pages/myrank/myrank'

// import { HttpWithTokenProvider } from '../providers/http-with-token/http-with-token';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {IonicStorageModule} from '@ionic/storage';
import {TabsPage} from "../pages/tabs/tabs";
import {ThisWeekPicPage} from  '../pages/this-week-pic/this-week-pic'

import {SwingModule} from 'angular2-swing';

@NgModule({

    declarations: [
        MyApp,
        VotePage,
        LoginPage,
        PlaygroundPage,
        RegisterPage,
        HomePage,
        TabsPage,
        MyrankPage,
        ThisWeekPicPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true,}),
        IonicStorageModule.forRoot(),
        HttpModule,
        SwingModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        VotePage,
        LoginPage,
        PlaygroundPage,
        RegisterPage,
        HomePage,
        TabsPage,
        MyrankPage,
        ThisWeekPicPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]

})
export class AppModule {
}
