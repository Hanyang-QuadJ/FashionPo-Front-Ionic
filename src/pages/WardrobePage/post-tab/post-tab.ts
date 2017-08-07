import {Component, OnInit} from '@angular/core';
import { NavController, NavParams,ModalController,LoadingController } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {Storage} from '@ionic/storage';
import {WardrobePage} from '../../WardrobePage/wardrobe/wardrobe'
import { WardrobePhotoPage } from '../../WardrobePage/wardrobe-photo/wardrobe-photo'
/**
 * Generated class for the PostTabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-post-tab',
  templateUrl: 'post-tab.html',

})
export class PostTabPage implements OnInit{
  // user: object = {};

  myPost: Array<object> = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public http: Http) {

  }
  ngOnInit(): void {
    this.myPost = this.navParams.data.mypost;
  }

  ionViewDidLoad() {
    console.log('----ionViewDidLoad PostTabPage----');




  }
  presentProfileModal(i) {
      let profileModal = this.modalCtrl.create(WardrobePhotoPage, { postList:this.myPost, postListIndex:'fit'+i},{leaveAnimation:'back'});
      profileModal.present();

  }

}
