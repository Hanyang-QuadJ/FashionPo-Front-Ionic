import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform, ModalController, LoadingController} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {PostTabPage} from "../../WardrobePage/post-tab/post-tab";
import {FavoriteTabPage} from "../../WardrobePage/favorite-tab/favorite-tab";
import {SettingsPage} from "../../WardrobePage/settings/settings";
import {WardrobeThisWeekPage} from '../../WardrobePage/wardrobe-this-week/wardrobe-this-week'



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
    this.storage.get('token').then((val) => {
      var APIUrl = '/user';
      var APIUrl_2 = '/post';
      var APIUrl_3 ='/rank';
      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/user';
      //   APIUrl_2 = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/post';
      //    APIUrl_3 = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/rank';
      // }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      // // .log(val);

      this.http.get(APIUrl + '/authed', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.user = data.user[0];
          this.userIntro = data.user[0].introduce;
          this.button_loaded = true;
          // .log("@#################");
          // .log(this.button_loaded);
          // .log(this.today_disable);
          // .log("@#################");
          this.http.get(APIUrl_3, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
              // .log('!!!!!rank!!!!');
              // .log(this.user._id);
              for(let i = 0; i<data.posts.length; i++){
                if(data.posts[i].writtenBy === this.user._id){
                  this.top.push(i+1);
                }
              }
              if(this.top.length===0){
                this.checkRank = true;
              }
              else{
                // .log(this.top);
                this.min = Math.min(...this.top);
                // .log(this.min);
              }

              this.http.get(APIUrl_2 + '/myposts', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                  if(data.posts.length === 0){
                    this.noneCheck = true;
                  }



                  for (var i = 0; i < data.posts.length; i++) {
                    //이번주 사진
                    if (data.posts[i].isThisWeek === true) {
                      this.thisWeekPost.push(data.posts[i]);
                    }
                    //모든 사진
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


                  this.http.get(APIUrl + '/favorite', {headers: headers})
                    .map(res => res.json())
                    .subscribe(data => {
                      if (data.favorites === undefined || data.favorites.length == 0) {
                        this.favorites = [];
                        this.loadedd = true;
                        loading.dismiss();

                      }
                      else {
                        const body = {users: data.favorites};
                        this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                          .map(res => res.json())
                          .subscribe(
                            data => {
                              this.favorites = data;

                              this.loadedd = true;
                              loading.dismiss();
                            });
                      }
                    });
                });
            });
        });

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
        this.storage.get('token').then((val) => {
            var APIUrl = '/user';
            if (this.platform.is('ios') == true){
              APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/user';
              // // console.log('yes');
            }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            this.http.get(APIUrl + '/authed', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.user = data.user[0];

                    this.button_loaded = true;
                    this.today_disable = false;


                })
        });
    }

}





