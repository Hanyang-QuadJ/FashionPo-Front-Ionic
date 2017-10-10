import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';

import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from "@ionic-native/status-bar";


import {LoginPage} from '../pages/AuthPage/login/login';
import {WelcomePage} from "../pages/welcome/welcome";
import {WardrobePage} from '../pages/WardrobePage/wardrobe/wardrobe'
import {VotePage} from '../pages/VotePage/vote/vote'
import {CameraPage} from '../pages/CameraPage/Camera/camera'
import {IntroPage} from "../pages/intro/intro";
import {Storage} from "@ionic/storage";
import {TagPage} from "../pages/tag/tag";
import {TabsPage} from "../pages/tabs/tabs";
import {ImageLoaderConfig} from "ionic-image-loader";


@Component({
	templateUrl: 'app.html',

})
export class MyApp {


	rootPage: any ;

	constructor(platform: Platform, statusBar: StatusBar,storage:Storage,splashScreen:SplashScreen) {
		platform.ready().then(() => {
			storage.get('token').then((val) => {
				const token = val;
				if (token != null && token != '') {
					this.rootPage = TabsPage;
				}
				else{
					this.rootPage = WelcomePage;
				}
			});

			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();

		});
	}
}

