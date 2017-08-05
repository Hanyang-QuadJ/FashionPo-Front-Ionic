import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
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
              private app: App,
              private storage: Storage) {
  }
  logOut() {
    this.storage.set('token', null);
    this.app.getRootNav().setRoot(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
}
