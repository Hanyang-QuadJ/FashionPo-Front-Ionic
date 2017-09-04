import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, LoadingController, Platform} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import {FavoriteUserPostPage} from '../favorite-user/favorite-user-post/favorite-user-post'
import {FavoriteUserThisWeekPage} from '../favorite-user/favorite-user-this-week/favorite-user-this-week';
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";


/**
 * Generated class for the FavoriteUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite-user',
  templateUrl: 'favorite-user.html',
})
export class FavoriteUserPage implements OnInit {
  favUser: any = "";
  posts: Array<any> = [];
  thisWeekPost: Array<any> = [];
  favUsers: any = "";

  weekCheck: boolean;

  checkPost: boolean;
  checkThis: any = "";
  alertThis: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController, private storage: Storage, public modalCtrl: ModalController,
              private http: Http, public platform: Platform,
              public fetchDatas: FetchDataProvider) {
    this.weekCheck = false;
  }

  ngOnInit(): void {
    this.posts = [];
    this.thisWeekPost = [];
    let loading = this.loadingCtrl.create({showBackdrop: false, cssClass: 'loading', spinner: 'crescent'});
    loading.present();
    this.checkThis = 0;
    this.checkPost = false;
    this.alertThis = false;
    this.favUser = this.navParams.get('favList');
    this.fetchDatas.postData('/post/userid', {_id: this.favUser._id}).then(data => {
      for (var i = 0; i < data.length; i++) {

        if (data[i].isThisWeek === true) {
          this.thisWeekPost.push(data[i]);
        }
        else if (data[i].isThisWeek === false) {
          this.posts.push(data[i]);
        }
      }
      if (this.thisWeekPost.length === 0) {
        this.weekCheck = true;
      }
      loading.dismiss();
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteUserPage');
  }

  public dismiss() {
    this.viewCtrl.dismiss()
  }

  presentFavModal(i) {
    let profileModal = this.modalCtrl.create(FavoriteUserPostPage, {
      postList: this.posts.slice().reverse(),
      postListIndex: 'fit' + i
    }, {leaveAnimation: 'back'});
    profileModal.present();

  }

  presentThisWeekModal(i) {
    let thisWeekModal = this.modalCtrl.create(FavoriteUserThisWeekPage, {
      thisWeekPost: this.thisWeekPost.slice().reverse(),
      thisWeekPostIndex: 'fit' + i
    }, {leaveAnimation: 'back'});
    thisWeekModal.present();
  }


}
