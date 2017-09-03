import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import {StatusBar} from "@ionic-native/status-bar";


import { LoginPage } from '../pages/AuthPage/login/login';
import {WelcomePage} from "../pages/welcome/welcome";
import {WardrobePage} from '../pages/WardrobePage/wardrobe/wardrobe'
import {VotePage} from '../pages/VotePage/vote/vote'
import {CameraPage} from '../pages/CameraPage/Camera/camera'


@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  rootPage:any = WelcomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

