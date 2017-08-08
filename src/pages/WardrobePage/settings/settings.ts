import { Component } from '@angular/core';
import { NavController, NavParams,App,ModalController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from "../../AuthPage/login/login";
import {UsernamePage} from "./UsernameChangePage/username";
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
              public modalCtrl: ModalController,
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
  presentUsernameModal() {
    let profileModal = this.modalCtrl.create(UsernamePage, { },{leaveAnimation:'back'});
    profileModal.present();

  }
}
