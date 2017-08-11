import { Component } from '@angular/core';
import { NavController, NavParams,App,ModalController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from "../../AuthPage/login/login";
import {UsernamePage} from "./UsernameChangePage/username";
import {UserProfileChange} from "./UserProfileChangePage/userprofile";

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
  user: object = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private app: App,
              public modalCtrl: ModalController,
              private storage: Storage) {
    this.user = this.navParams.get('users');



  }
  logOut() {
    this.storage.set('token', null);
    this.app.getRootNav().setRoot(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    console.log('@@#@#@#@#@')
    console.log(this.user)
  }
  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
  presentUsernameModal() {
    let profileModal = this.modalCtrl.create(UsernamePage, { },{leaveAnimation:'back'});
    profileModal.present();

  }

  presentUserProfileModal() {
    let profileModal = this.modalCtrl.create(UserProfileChange, { },{leaveAnimation:'back'});
    profileModal.present();

  }


}
