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
  User_id: any;
  backRefresh:boolean;
  User: any;
  button:boolean = false;
  try:boolean = false;
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
    this.backRefresh = false;
    this.alertThis = false;
    this.favUser = this.navParams.get('favList');
    this.User_id = this.navParams.get('user_id');
    this.fetchDatas.postData('/post/view',{user_id:[this.favUser._id]}).then(data=>{
    });

    this.fetchDatas.postData('/user', {users: [this.favUser._id]}).then(data => {
      this.User = data[0];
      this.fetchDatas.getData('/user/authed').then(data => {
        if (data.user[0].favorites.indexOf(this.User._id) !== -1) {
          this.button = true;
        }
        else
          this.button = false;


      })
    });
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
    let renewedData = "notRenewed";
    this.viewCtrl.dismiss(renewedData);
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

  addFavorite() {
    this.button = true;
    this.try = true;
    this.fetchDatas.postData('/user/favorite',{_id: this.User._id}).then(data=>{
      this.button = true;
      this.try = false;
    });

  }

  public dismissRefresh() {
    let renewedData = "Renewed";
    this.viewCtrl.dismiss(renewedData);
  }

  removeFavorite(post) {
    this.button = false;
    this.try = true;
    this.fetchDatas.deleteData('/user/favorite',{_id: this.User._id}).then(data=>{
          this.try = false;
          this.backRefresh = true;
        },
        err=>{
        });
  }


}
