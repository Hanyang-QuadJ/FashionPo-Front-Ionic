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


  // option: string = "";
  // myposts: string = "";
  // favorites: Array<object> = [];
  // favoritesLength: string = "";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public http: Http) {

  }
  ngOnInit(): void {
    this.myPost = this.navParams.data.sample;
    // this.myPost = this.navParams.data.sample;
    // var APIUrl_2 = '/post';
    // // if (this.platform.is('ios') == true){
    // //   APIUrl = 'http://54.162.160.91/api/user';
    // // }
    // let loading = this.loadingCtrl.create({
    //
    // });
    //
    // loading.present();
    // this.storage.get('token').then((val) => {
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   headers.append('x-access-token', val);
    //
    //   this.http.get(APIUrl_2 + '/myposts', {headers: headers})
    //     .map(res => res.json())
    //     .subscribe(data => {
    //       this.mypostlist = data.posts;
    //       // this.myposts = data.posts.length;
    //     });
    // });
    // loading.dismiss();
    // console.log(this.wardrobe.sample)
  }

  ionViewDidLoad() {
    console.log('----ionViewDidLoad PostTabPage----');
    console.log(this.navParams.data.sample);



  }
  presentProfileModal(i) {
      let profileModal = this.modalCtrl.create(WardrobePhotoPage, { postList:this.myPost, postListIndex:'fit'+i},{leaveAnimation:'back'});
      profileModal.present();

  }

}
