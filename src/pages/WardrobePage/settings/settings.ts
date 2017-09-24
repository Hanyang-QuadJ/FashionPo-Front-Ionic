import { Component } from '@angular/core';
import { NavController, NavParams,App,ModalController,LoadingController,AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from "../../AuthPage/login/login";
import {UsernamePage} from "./UsernameChangePage/username";
import {UserProfileChange} from "./UserProfileChangePage/userprofile";
import {PasswordChangePage} from "./PasswordChangePage/password";
import {ChangeWardrobeNamePage} from "./WardrobeNameChangePage/wardrobename";
import {IntroduceChangePage} from "./IntroduceChangePage/introduce";
import {TermsPage} from "../../terms/terms";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";



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
  user: any = {};
  showFavorite: Boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private app: App,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public fetchDatas : FetchDataProvider,
              public alertCtrl : AlertController,
              private storage: Storage) {

    this.fetchDatas.getData('/user/authed').then(data=>{
      this.user = data.user[0];
      this.showFavorite = this.user.showFavorite;
      console.log(this.user);
    })

  }
  toggleFavorite() {
    if (this.showFavorite) {
      this.fetchDatas.getData('/user/favorite/show').then(data=> {
        console.log(data);
      })
    }
      else {
          this.fetchDatas.getData('/user/favorite/hide').then(data=> {
              console.log(data);
          })
      }
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      message: 'Do you want to Sign Out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sign Out',
          handler: () => {
            this.logOut();
          }
        }
      ]
    });
    alert.present();
  }
  logOut() {
    this.storage.set('token', null);
    this.app.getRootNav().setRoot(LoginPage,{check:'logout'});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    console.log('@@#@#@#@#@');
    console.log(this.user)
  }
  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
  presentUsernameModal() {
    let profileModal = this.modalCtrl.create(UsernamePage, { },{leaveAnimation:'back'});
    profileModal.onDidDismiss(()=>{
      let loading = this.loadingCtrl.create({
        showBackdrop: true, spinner: 'crescent',enableBackdropDismiss:true
      });
      loading.present();
      this.fetchDatas.getData('/user/authed').then(data=>{
        this.user = data.user[0];
        loading.dismiss();
      })


    });
    profileModal.present();

  }

  presentUserProfileModal() {
    let profileModal = this.modalCtrl.create(UserProfileChange, { },{leaveAnimation:'back'});
    profileModal.onDidDismiss(()=>{
      let loading = this.loadingCtrl.create({
        showBackdrop: true, spinner: 'crescent',enableBackdropDismiss:true
      });
      loading.present();
      this.fetchDatas.getData('/user/authed').then(data=>{
        this.user = data.user[0];
        loading.dismiss();
      })


    });
    profileModal.present();

  }

  presentPasswordModal() {
    let profileModal = this.modalCtrl.create(PasswordChangePage, { },{leaveAnimation:'back'});
    profileModal.onDidDismiss(()=>{
      let loading = this.loadingCtrl.create({
        showBackdrop: true, spinner: 'crescent',enableBackdropDismiss:true
      });
      loading.present();
      this.fetchDatas.getData('/user/authed').then(data=>{
        this.user = data.user[0];
        loading.dismiss();
      })


    });
    profileModal.present();
  }

  presentWardrobeModal() {
    let profileModal = this.modalCtrl.create(ChangeWardrobeNamePage, { },{leaveAnimation:'back'});
    profileModal.onDidDismiss(()=>{
      let loading = this.loadingCtrl.create({
        showBackdrop: true, spinner: 'crescent',enableBackdropDismiss:true
      });
      loading.present();
      this.fetchDatas.getData('/user/authed').then(data=>{
        this.user = data.user[0];
        loading.dismiss();
      })


    });
    profileModal.present();
  }
  presentTermsModal(){
    let termsModal = this.modalCtrl.create(TermsPage);
    termsModal.present();
  }

  presentIntroduceModal() {
    let profileModal = this.modalCtrl.create(IntroduceChangePage, { },{leaveAnimation:'back'});
    profileModal.onDidDismiss(()=>{
      let loading = this.loadingCtrl.create({
        showBackdrop: true, spinner: 'crescent',enableBackdropDismiss:true
      });
      loading.present();
      this.fetchDatas.getData('/user/authed').then(data=>{
        this.user = data.user[0];
        loading.dismiss();
      })


    });
    profileModal.present();
  }
}
