import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from "../login/login";
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }
  logOut() {
    this.storage.set('token', null);
    this.navCtrl.setRoot(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
