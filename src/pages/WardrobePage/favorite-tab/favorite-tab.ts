import {Component, OnInit} from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {Storage} from '@ionic/storage';
import {FavoriteUserPage} from '../favorite-user/favorite-user'
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
export class FavoriteTabPage implements OnInit{
  favorites: Array<object> = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public modalCtrl : ModalController,
              public http: Http) {
  }
  ngOnInit(): void {
    this.favorites = this.navParams.data.favorite;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteTabPage');
  }
  presentFavModal(i) {
    let profileModal = this.modalCtrl.create(FavoriteUserPage, { favList:this.favorites[i]},{leaveAnimation:'back'});
    profileModal.present();

  }

}
