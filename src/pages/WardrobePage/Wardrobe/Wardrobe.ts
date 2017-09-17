import {Component,ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, ModalController, Content,LoadingController} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {PostTabPage} from "../../WardrobePage/post-tab/post-tab";
import {FavoriteTabPage} from "../../WardrobePage/favorite-tab/favorite-tab";
import {SettingsPage} from "../../WardrobePage/settings/settings";
import {WardrobeThisWeekPage} from '../../WardrobePage/wardrobe-this-week/wardrobe-this-week'
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import {WardrobePhotoPage} from "../wardrobe-photo/wardrobe-photo";
import {FavoriteUserPage} from "../favorite-user/favorite-user";
import {LogPage} from "../log/log";


// import {TabsPage} from "../tabs/tabs";


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'wardrobe.html',

})


export class WardrobePage {
  public toggled: boolean;
  min: Number = null;
  checkRank: boolean;
  user: any = "";
  top: Array<any> = [];
  userIntro: any = "";
  noneCheck: boolean;
  loaded: boolean;
  loadedd: boolean;
  mypostlist: Array<object> = [];
  thisWeekPost: Array<object> = [];
  thisWeekPostLength: boolean;
  @ViewChild(Content) content: Content;

  option: string = "";

  favorites: Array<any> = [];

  postAlert: string = "";
  addCount:any;

  date: Array<string> = [];
  newTab: any;

  isNewPost: Array<boolean>;
  isNewAdd:boolean=false;


  button_loaded: boolean = false;
  today_disable: boolean = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private http: Http,
              public fetchDatas: FetchDataProvider,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public platform: Platform) {
    this.thisWeekPostLength = false;
    this.newTab = "fit";
    this.mypostlist = [];
    this.thisWeekPost = [];
    this.isNewPost = [];


  }

  Settings() {
    this.navCtrl.push(SettingsPage, {users: this.user}, {});
  }

  test() {
    this.navCtrl.parent.select(1);
  }

  fetchData() {
    this.isNewPost = [];
    this.mypostlist = [];
    this.checkRank = false;
    this.noneCheck = false;
    this.thisWeekPost = [];
    this.top = [];
    this.loaded = false;
    this.loadedd = false;
    this.option = "favorites";
    console.log('1');
    console.log(this.thisWeekPost);
    let loading = this.loadingCtrl.create({
      showBackdrop: true, spinner: 'crescent',
    });
    loading.present();
    this.fetchDatas.getData('/user/authed').then(data => {
      if(data.user[0].addNews.length !== 0){
        this.isNewAdd = true;
        this.addCount = data.user[0].addNews.length;
      }
      else{
        this.isNewAdd = false;
      }
      this.user = data.user[0];
      this.userIntro = data.user[0].introduce;
      this.button_loaded = true;
      this.fetchDatas.getData('/rank').then(data => {

        for (let i = 0; i < data.posts.length; i++) {
          if (data.posts[i].writtenBy === this.user._id) {
            this.top.push(i + 1);
          }
        }
        if (this.top.length === 0) {
          this.checkRank = true;
        }
        else {
          this.min = Math.min(...this.top);
        }
      }, err => {
        console.log(err);
      });
      this.fetchDatas.getData('/post/myposts').then(data => {
        this.mypostlist = [];
        this.thisWeekPost = [];
        if (data.posts.length === 0) {
          this.noneCheck = true;
        }
        for (var i = 0; i < data.posts.length; i++) {
          //This week fits
          if (data.posts[i].isThisWeek === true) {
            this.thisWeekPost.push(data.posts[i]);
          }
          //Past fits
          else {
            this.mypostlist.push(data.posts[i]);
          }

        }
        if (this.thisWeekPost.length === 0) {
          this.thisWeekPostLength = true;
        }
        else {
          this.thisWeekPostLength = false;
        }
        if (this.mypostlist.length === 0 || this.mypostlist === undefined) {
          this.loaded = true;
        }
        else {
          this.loaded = false;
        }
        console.log('2');
        console.log(this.thisWeekPost);

      });
      this.fetchDatas.getData('/user/favorite').then(data => {
        if (data.favorites === undefined || data.favorites.length === 0) {
          this.favorites = [];
          this.loadedd = true;
          loading.dismiss();
        }
        else {
          this.fetchDatas.postData('/user', {users: data.favorites}).then(data => {
            this.favorites = data;
            this.loadedd = false;
            this.fetchDatas.getData('/user/authed').then(data => {
              this.isNewPost = [];
              if(data.user[0].news===[] || data.user[0].news.length === 0){

                for(let i = 0; i < this.favorites.length; i++){
                  this.isNewPost.push(false);
                }
                loading.dismiss();
              }
              else{
                let user: Array<any> = data.user[0].news;
                console.log("Check!");
                console.log(this.favorites);
                console.log(user);
                for (let i = 0; i < this.favorites.length; i++) {
                  console.log(user.indexOf(this.favorites[i]._id));
                  if (user.indexOf(this.favorites[i]._id) === -1) {
                    this.isNewPost.push(false)
                  }
                  else if (user.indexOf(this.favorites[i]._id) > -1) {
                    this.isNewPost.push(true)
                  }
                }
                loading.dismiss();
                console.log(this.isNewPost);
              }

            });
          })
        }
      });
    });
  }

  ionViewWillEnter() {
    console.log("Check DATA FETCH");
    this.fetchData();
  }
  favNewCheck(){

  }


  presentThisWeekModal(i) {
    let thisWeekModal = this.modalCtrl.create(WardrobeThisWeekPage, {
      thisWeekPost: this.thisWeekPost.slice().reverse(),
      thisWeekPostIndex: i,
    }, {leaveAnimation: 'back'});
    thisWeekModal.onDidDismiss((renewedData) => {
      if (renewedData === "renewed") {
        this.fetchData();
      }
    });
    thisWeekModal.present();
  };

  presentProfileModal(i) {

    let profileModal = this.modalCtrl.create(WardrobePhotoPage, {
      postList: this.mypostlist.slice().reverse(),
      postListIndex: i,
    }, {leaveAnimation: 'back'});
    profileModal.onDidDismiss((check) => {
      if (check === "check") {
        this.fetchData();
      }
    });
    profileModal.present();

  }

  presentLogModal() {
    let logModal = this.modalCtrl.create(LogPage);
    logModal.onDidDismiss(()=>{
      this.fetchDatas.getData('/user/authed').then(data=>{
        if(data.user[0].addNews.length !== 0){
          this.isNewAdd = true;
          this.addCount = data.user[0].addNews.length;
        }
        else{
          this.isNewAdd = false;
        }
      })
    });
    logModal.present();

  }

  presentFavModal(i) {
    console.log(this.isNewPost[i]);
    if (this.isNewPost[i] === true) {

      let dismiss = 'dismiss';
      let profileModal = this.modalCtrl.create(FavoriteUserPage, {
        favList: this.favorites[i],
        dismiss: dismiss
      }, {leaveAnimation: 'back'});
      profileModal.onDidDismiss(() => {
        let loading = this.loadingCtrl.create({
          showBackdrop: true, spinner: 'crescent',
        });
        loading.present();
        this.fetchDatas.getData('/user/favorite').then(data => {
          if (data.favorites === undefined || data.favorites.length === 0) {
            this.favorites = [];
            this.loadedd = true;
            loading.dismiss();

          }
          else {
            this.fetchDatas.postData('/user', {users: data.favorites}).then(data => {
              this.favorites = data;
              this.loadedd = false;
              this.fetchDatas.getData('/user/authed').then(data => {
                this.isNewPost = [];
                if(data.user[0].news===[] || data.user[0].news.length === 0){

                  for(let i = 0; i < this.favorites.length; i++){
                    this.isNewPost.push(false);
                  }
                  loading.dismiss();

                }
                else{
                  let user: Array<any> = data.user[0].news;
                  console.log("Check!");
                  console.log(this.favorites);
                  console.log(user);
                  for (let i = 0; i < this.favorites.length; i++) {
                    console.log(user.indexOf(this.favorites[i]._id));
                    if (user.indexOf(this.favorites[i]._id) === -1) {
                      this.isNewPost.push(false)
                    }
                    else if (user.indexOf(this.favorites[i]._id) > -1) {
                      this.isNewPost.push(true)
                    }
                  }
                  loading.dismiss();


                }

              });
            })
          }
        });

      });
      profileModal.present();

    }
    else if (this.isNewPost[i] === false) {
      let profileModal = this.modalCtrl.create(FavoriteUserPage, {favList: this.favorites[i]}, {leaveAnimation: 'back'});
      profileModal.onDidDismiss((renewedData) => {
        if (renewedData === "Renewed") {
          console.log(renewedData);
          this.fetchData();
        }
        else if (renewedData === "notRenewed") {
          console.log(renewedData);
        }
      });
      profileModal.present();

    }


  }

  refreshViewCnt() {
    this.today_disable = true;
    this.button_loaded = false;
    this.fetchDatas.getData('/user/authed').then(data => {
      this.user = data.user[0];
      this.button_loaded = true;
      this.today_disable = false;
    });
  }
  ionSelected(){
    this.content.scrollToTop();
  }


}





