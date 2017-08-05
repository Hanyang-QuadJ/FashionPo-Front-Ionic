import {Component, OnInit} from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {Storage} from '@ionic/storage';
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
export class PostTabPage {
  // // user: object = {};
  public mypostlist: Array<object> = [];
  // // option: string = "";
  // // myposts: string = "";
  // // favorites: Array<object> = [];
  // // favoritesLength: string = "";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public modalCtrl: ModalController,
              public http: Http) {
  }
  ngOnInit(): void {
    var APIUrl_2 = '/post';
  //   // if (this.platform.is('ios') == true){
  //   //   APIUrl = 'http://54.162.160.91/api/user';
  //   // }
    this.storage.get('token').then((val) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      console.log(val);

      this.http.get(APIUrl_2 + '/myposts', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.mypostlist = data.posts;
          // this.myposts = data.posts.length;
        });
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PostTabPage');
  }



  presentProfileModal(i) {

      let profileModal = this.modalCtrl.create(WardrobePhotoPage, { postList:this.mypostlist[i]},{ showBackdrop: false,
        enableBackdropDismiss: false,
        enterAnimation: 'modal-scale-up-enter',
        leaveAnimation: 'back'});
      profileModal.present();



  }

}
