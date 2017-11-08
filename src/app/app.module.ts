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
import {TagListPage} from "../pages/tag/tag-list/tag-list";
import {IntroPage} from "../pages/intro/intro";
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {WelcomePage} from '../pages/welcome/welcome';
import {SignupNamePage} from "../pages/AuthPage/signup/signup-name/signup-name";
import {SignupPasswordPage} from "../pages/AuthPage/signup/signup-password/signup-password";
import {ChangeWardrobeNamePage} from "../pages/WardrobePage/settings/WardrobeNameChangePage/wardrobename";
import {TagPage} from '../pages/tag/tag'
import {OrderModule} from "ngx-order-pipe";
import {FetchDataProvider} from '../providers/fetch-data/fetch-data';
import {LogPage} from "../pages/WardrobePage/log/log";
import {TermsPage} from "../pages/terms/terms";
import {Network} from "@ionic-native/network";
import {ReportPage} from "../pages/report/report";
import {LicensePage} from "../pages/license/license";
import {IonicImageLoader} from "ionic-image-loader";
import {Config} from "ionic-angular";
import {IosCustomTransitions} from "../config/ios-custom-transitions";
import {RankNewPage} from "../pages/rank-new/rank-new";
import {TagInputPage} from "../pages/tag-input/tag-input";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {LinkPage} from "../pages/link/link";
import {OverlayPage} from "../pages/overlay/overlay";
import { Push, PushObject} from '@ionic-native/push';



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
		SignupNamePage,
		SignupPasswordPage,
		ReportPage,


		TagPage,
		TagListPage,
		IntroPage,
		WelcomePage,
		TermsPage,

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
		LogPage,
		LicensePage,
		RankNewPage,
		TagInputPage,
		LinkPage,
		OverlayPage,

	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true, swipeBackEnabled:'true'}
		),
		IonicStorageModule.forRoot(),
		HttpModule,
		SwingModule,
		IonicImageViewerModule,
		OrderModule,
		IonicImageLoader.forRoot(),
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
		TagListPage,
		SignupPage,
		PostTabPage,
		IntroPage,
		FavoriteTabPage,
		SettingsPage,
		WardrobePhotoPage,
		FavoriteUserPage,
		UsernamePage,
		WardrobeCameraPage,
		VoteWardrobePage,
		HistoryListPage,
		WelcomePage,
		ReportPage,
		LicensePage,
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
		SignupNamePage,
		SignupPasswordPage,
		LogPage,
		TermsPage,
		RankNewPage,
		TagInputPage,
		LinkPage,
		OverlayPage,

	],
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		PhotoLibrary,
		File,
		Transfer,
		FilePath,
		Network,
		InAppBrowser,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		FetchDataProvider,
		Push



	]

})
export class AppModule {
	constructor(config:Config){
		config.setTransition('ios-transition',IosCustomTransitions);
	}

}
