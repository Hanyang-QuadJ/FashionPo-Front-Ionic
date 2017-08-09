import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Camera} from '@ionic-native/camera';
import {PhotoLibrary} from '@ionic-native/photo-library';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// import { NativeStorage } from '@ionic-native/native-storage';
import {MyApp} from './app.component';

import {HomePage} from '../pages/RankPage/home/home';
import {VotePage} from '../pages/VotePage/vote/vote';
import {LoginPage} from '../pages/AuthPage/login/login';
import {CameraPage} from '../pages/CameraPage/Camera/camera';
import {WardrobePage} from '../pages/WardrobePage/wardrobe/wardrobe';
import {UsernamePage} from '../pages/WardrobePage/settings/UsernameChangePage/username';
import {WardrobeCameraPage} from '../pages/WardrobePage/wardrobe-camera/wardrobe-camera';
import {SignupPage} from '../pages/AuthPage/signup/signup';
import {VoteWardrobePage} from '../pages/VotePage/vote/vote-wardrobe/vote-wardrobe';
import {HistoryListPage} from '../pages/RankPage/history-list/history-list';
import {HistoryRankPage} from '../pages/RankPage/history-rank/history-rank';
// import { HttpWithTokenProvider } from '../providers/http-with-token/http-with-token';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {IonicStorageModule} from '@ionic/storage';
import {TabsPage} from "../pages/tabs/tabs";

import {SearchUserPage} from '../pages/RankPage/search-user/search-user'
import {SearchTagsPage} from '../pages/RankPage/search-tags/search-tags'
import {SwingModule} from 'angular2-swing';

import {File} from '@ionic-native/file';
import {Transfer} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
// import { ScrollableTabs } from '../assets/components/scrollable-tabs'
import {SuperTabsModule} from 'ionic2-super-tabs';
import {PostTabPage} from "../pages/WardrobePage/post-tab/post-tab";
import {FavoriteTabPage} from "../pages/WardrobePage/favorite-tab/favorite-tab";
import {SettingsPage} from "../pages/WardrobePage/settings/settings";
import {WardrobePhotoPage} from '../pages/WardrobePage/wardrobe-photo/wardrobe-photo';
import {FavoriteUserPage} from '../pages/WardrobePage/favorite-user/favorite-user'
// import { Camera } from '@ionic-native/camera';


@NgModule({

    declarations: [

        MyApp,
        VotePage,
        LoginPage,
        CameraPage,
        WardrobePage,
        HomePage,
        TabsPage,
        WardrobeCameraPage,
        HistoryRankPage,
        SearchUserPage,
        SearchTagsPage,
        SignupPage,
        PostTabPage,
        FavoriteTabPage,
        SettingsPage,
        WardrobePhotoPage,
        FavoriteUserPage,
        UsernamePage,
        VoteWardrobePage,
        HistoryListPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true, tabsOnSupPagesPlacement: 'bottom'}
        ),
        IonicStorageModule.forRoot(),
        HttpModule,
        SwingModule,

        SuperTabsModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [

        MyApp,
        VotePage,
        LoginPage,
        CameraPage,
        WardrobePage,
        HomePage,
        TabsPage,
        SearchUserPage,
        SearchTagsPage,
        SignupPage,
        PostTabPage,
        FavoriteTabPage,
        SettingsPage,
        WardrobePhotoPage,
        FavoriteUserPage,
        UsernamePage,
        WardrobeCameraPage,
        VoteWardrobePage,
        HistoryListPage,
        HistoryRankPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        PhotoLibrary,
        File,
        Transfer,
        FilePath,

        , {provide: ErrorHandler, useClass: IonicErrorHandler},

    ]

})
export class AppModule {

}
