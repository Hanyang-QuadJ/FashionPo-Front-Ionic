import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform, ModalController, LoadingController} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {PostTabPage} from "../../WardrobePage/post-tab/post-tab";
import {FavoriteTabPage} from "../../WardrobePage/favorite-tab/favorite-tab";
import {SettingsPage} from "../../WardrobePage/settings/settings";
import {WardrobeThisWeekPage} from '../../WardrobePage/wardrobe-this-week/wardrobe-this-week'
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";


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


export class WardrobePage implements OnInit{
    public toggled: boolean;
    min:Number=null;
    checkRank:boolean;
    user: any = "";
    top:Array<any>=[];
    userIntro:any="";
    noneCheck:boolean;
    loaded: boolean;
    loadedd: boolean;
    mypostlist: Array<object> = [];
    thisWeekPost: Array<object> = [];
    thisWeekPostLength:boolean;
    option: string = "";
    myposts: string = "";
    favorites: Array<object> = [];
    favoritesLength: string = "";
    postAlert: string = "";
    tab1: any = PostTabPage;
    tab2: any = FavoriteTabPage;
    date: Array<string> = [];
    date2: Array<string> = [];

    checkThis = 0;
    alertThis: boolean;
    view_cnt: any;
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
      this.thisWeekPostLength=false;


    }
    ngOnInit(): void {
    }
    Settings() {
        this.navCtrl.push(SettingsPage, {users: this.user}, {});
    }
    test(){
      this.navCtrl.parent.select(1);
    }

    ionViewWillEnter() {
      this.fetchData();

    }

  public fetchData(){
    this.mypostlist = [];
    this.checkRank = false;
    this.noneCheck = false;
    this.thisWeekPost = [];
    this.top = [];
    this.loaded = false;
    this.loadedd = false;
    this.option = "favorites";
    let loading = this.loadingCtrl.create({
      showBackdrop: true, spinner: 'crescent',
    });
    loading.present();
    this.fetchDatas.getData('/user/authed').then(data=>{
      this.user = data.user[0];
      this.userIntro = data.user[0].introduce;
      this.button_loaded = true;
      this.fetchDatas.getData('/rank').then(data=>{
        for(let i = 0; i<data.posts.length; i++){
          if(data.posts[i].writtenBy === this.user._id){
            this.top.push(i+1);
          }
        }
        if(this.top.length===0){
          this.checkRank = true;
        }
        else{
          this.min = Math.min(...this.top);
        }
      });
      this.fetchDatas.getData('/post/myposts').then(data=>{
        if(data.posts.length === 0){
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
        if(this.thisWeekPost.length === 0){
          this.thisWeekPostLength = true;
        }
        else{
          this.thisWeekPostLength = false;
        }
        this.loaded = true;
      });
      this.fetchDatas.getData('/user/favorite').then(data=>{
        if (data.favorites === undefined || data.favorites.length == 0) {
          this.favorites = [];
          this.loadedd = true;
          loading.dismiss();
        }
        else{
          this.fetchDatas.postData('/user',{users:data.favorites}).then(data=>{
            this.favorites = data;
            this.loadedd = true;
            loading.dismiss();
          })
        }
      })
    });
  }
  presentThisWeekModal(i) {
    let thisWeekModal = this.modalCtrl.create(WardrobeThisWeekPage, {
      thisWeekPost: this.thisWeekPost.slice().reverse(),
      thisWeekPostIndex: i,
    }, {leaveAnimation: 'back'});
    thisWeekModal.onDidDismiss((renewedData)=> {
      if(renewedData==="renewed"){
        this.fetchData();
      }
    });
    thisWeekModal.present();
  };

    refreshViewCnt() {
      this.today_disable = true;
      this.button_loaded = false;
      this.fetchDatas.getData('/user/authed').then(data => {
        this.user = data.user[0];
        this.button_loaded = true;
        this.today_disable = false;
      });
    }


}





