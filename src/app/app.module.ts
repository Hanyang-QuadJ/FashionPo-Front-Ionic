import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
import {SearchUserPage} from '../pages/search-user/search-user'
import {SearchTagsPage} from '../pages/search-tags/search-tags'
import {SwingModule} from 'angular2-swing';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
// import { Camera } from '@ionic-native/camera';

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
        SearchUserPage,
        SearchTagsPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true, tabsOnSupPagesPlacement:'bottom'}),
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
        SearchUserPage,
        SearchTagsPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        PhotoLibrary,
        File,
        Transfer,
        FilePath
      ,{provide: ErrorHandler, useClass: IonicErrorHandler}
    ]

})
export class AppModule {
}
