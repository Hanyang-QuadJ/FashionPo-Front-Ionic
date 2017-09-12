import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../AuthPage/login/login";
import {StatusBar} from "@ionic-native/status-bar";
import {Storage} from "@ionic/storage";
import {SignupPage} from "../AuthPage/signup/signup";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar,private storage:Storage) {
    this.statusBar.styleLightContent();
    this.storage.get('token').then((val) => {
      const token = val;
      if (token != null && token != '') {
        this.navCtrl.push(TabsPage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  goToLogin(){
    this.navCtrl.push(LoginPage)
  }
  goToSignUp(){
    this.navCtrl.push(SignupPage);
  }

}
