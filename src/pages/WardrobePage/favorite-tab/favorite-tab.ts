import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ModalController, LoadingController} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {Storage} from '@ionic/storage';
import {FavoriteUserPage} from '../favorite-user/favorite-user'
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";

/**
 * Generated class for the FavoriteTabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite-tab',
  templateUrl: 'favorite-tab.html',
})
export class FavoriteTabPage implements OnInit {
  favorites: Array<object> = [];
  check: boolean;
  id:any="";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public fetchDatas : FetchDataProvider,
              public http: Http) {
  }

  ngOnInit(): void {
    this.favorites = this.navParams.data.favorite;
    this.id = this.navParams.data.id;
    if (this.favorites === [] || this.favorites.length === 0) {
      this.check = true;
    }
    else {
      this.check = false;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteTabPage');
  }

  presentFavModal(i) {
    let profileModal = this.modalCtrl.create(FavoriteUserPage, {favList: this.favorites[i]}, {leaveAnimation: 'back'});
    profileModal.onDidDismiss((renewedData) => {

      if (renewedData === "Renewed") {
        console.log(renewedData);
        let loading = this.loadingCtrl.create({
          showBackdrop: false, spinner: 'crescent',
        });
        loading.present();
        this.fetchDatas.getData('/user/favorite').then(data=>{
          if (data.favorites === undefined || data.favorites.length == 0) {
            this.favorites = [];
            this.check = true;
            loading.dismiss();
          }
          else{
            this.fetchDatas.postData('/user',{users:data.favorites}).then(data=>{
              this.favorites = data;
              loading.dismiss();
            })
          }
        });
      }
      else if(renewedData === "notRenewed"){
        console.log(renewedData);
      }
    });
    profileModal.present();

  }

}
