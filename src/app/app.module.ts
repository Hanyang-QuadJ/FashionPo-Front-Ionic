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
import {FindPasswordPage} from '../pages/AuthPage/FindPasswordPage/find';

// import { HttpWithTokenProvider } from '../providers/http-with-token/http-with-token';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {IonicStorageModule} from '@ionic/storage';
import {TabsPage} from "../pages/tabs/tabs";


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
import {UserProfileChange} from "../pages/WardrobePage/settings/UserProfileChangePage/userprofile";
import {FavoriteUserPostPage} from '../pages/WardrobePage/favorite-user/favorite-user-post/favorite-user-post';
import {WardrobeThisWeekPage} from '../pages/WardrobePage/wardrobe-this-week/wardrobe-this-week';
import {FavoriteUserThisWeekPage} from '../pages/WardrobePage/favorite-user/favorite-user-this-week/favorite-user-this-week'
import {RankWardrobePage} from '../pages/RankPage/rank-wardrobe/rank-wardrobe';
import {RankPhotoPage} from '../pages/RankPage/rank-wardrobe/rank-photo/rank-photo';
import {RankThisWeekPage} from '../pages/RankPage/rank-wardrobe/rank-this-week/rank-this-week';
import {VoteThisWeekPage} from '../pages/VotePage/vote/vote-wardrobe/vote-this-week/vote-this-week';
import {VotePhotoPage} from '../pages/VotePage/vote/vote-wardrobe/vote-photo/vote-photo';
import {PasswordChangePage} from "../pages/WardrobePage/settings/PasswordChangePage/password";
import {IntroduceChangePage} from "../pages/WardrobePage/settings/IntroduceChangePage/introduce";

import {IonicImageViewerModule} from 'ionic-img-viewer';

import {ChangeWardrobeNamePage} from "../pages/WardrobePage/settings/WardrobeNameChangePage/wardrobename";
import {TagPage} from '../pages/tag/tag'
import {OrderModule} from "ngx-order-pipe";


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
        TagPage,

        SignupPage,
        PostTabPage,
        FavoriteTabPage,
        SettingsPage,
        WardrobePhotoPage,
        FavoriteUserPage,
        UsernamePage,
        VoteWardrobePage,
        HistoryListPage,
        UserProfileChange,
        FavoriteUserPostPage,
        WardrobeThisWeekPage,
        FavoriteUserThisWeekPage,
        RankWardrobePage,
        RankPhotoPage,
        RankThisWeekPage,
        VoteThisWeekPage,
        VotePhotoPage,
        FindPasswordPage,
        PasswordChangePage,
        ChangeWardrobeNamePage,
        IntroduceChangePage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true, tabsOnSupPagesPlacement: 'bottom'}
        ),
        IonicStorageModule.forRoot(),
        HttpModule,
        SwingModule,
        IonicImageViewerModule,
        OrderModule,
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
        UserProfileChange,
        FavoriteUserPostPage,
        WardrobeThisWeekPage,
        FavoriteUserThisWeekPage,
        RankWardrobePage,
        RankPhotoPage,
        RankThisWeekPage,
        VoteThisWeekPage,
        VotePhotoPage,
        FindPasswordPage,
        PasswordChangePage,
        ChangeWardrobeNamePage,
        IntroduceChangePage,
        TagPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        PhotoLibrary,
        File,
        Transfer,
        FilePath,
        {provide: ErrorHandler, useClass: IonicErrorHandler},

    ]

})
export class AppModule {

}
