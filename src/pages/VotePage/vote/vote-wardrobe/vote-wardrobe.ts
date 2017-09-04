/**
 * Created by jeonghyunlee on 2017. 8. 9..
 */
import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Content,} from 'ionic-angular';
import {Platform, ModalController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Http, Headers,RequestOptions} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {VoteThisWeekPage} from '../vote-wardrobe/vote-this-week/vote-this-week'
import {VotePhotoPage} from '../vote-wardrobe/vote-photo/vote-photo'
import {FetchDataProvider} from "../../../../providers/fetch-data/fetch-data";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'vote-wardrobe',
    templateUrl: 'vote-wardrobe.html',
})

export class VoteWardrobePage {
    usernameForm: FormGroup;
    User_id: any;
    User: any;
    loaded: boolean = false;
    button_loaded:boolean = true;
    posts: any = "";
  weekCheck:boolean;
    thisWeekPost:any="";
    button:boolean = false;
    try:boolean = false;
    view_cnt: any;
  date: Array<string> = [];
  date2: Array<string> = [];
  dateFinal: Array<object> = [];
  dateFinal2: Array<object> = [];
  year: Array<any> = [];
  year2: Array<any> = [];
  startDay: Array<any> = [];
  endDay: Array<any> = [];
  endDay2: Array<any> = [];
  month: Array<any> = [];
  month2: Array<any> = [];

    today_disable = false;
    constructor(public viewCtrl: ViewController,
                public fb: FormBuilder,
                public platform: Platform,
                private storage: Storage,
                private http: Http,
                public toastCtrl: ToastController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                public fetchDatas: FetchDataProvider,
    ) {
        this.weekCheck=false;
        this.usernameForm = this.fb.group({
            username: ['', Validators.compose([Validators.required])],

        });
    }

    ngOnInit(): void {
        this.posts=[];
        this.date=[];
        this.date2=[];

        this.thisWeekPost=[];
        this.User_id = this.navParams.get('user_id');
        let loading = this.loadingCtrl.create({showBackdrop:false,spinner:'crescent',
        });
        loading.present();
        this.fetchDatas.postData('/user',{users:[this.User_id]}).then(data=>{
          this.User = data[0];
          this.fetchDatas.postData('/post/userid',{_id:[this.User_id]}).then(data=>{
            for(var i = 0; i<data.length;i++){
              if(data[i].isThisWeek===true){
                this.thisWeekPost.push(data[i]);
              }
              else{
                this.posts.push(data[i]);
              }
            }
            if(this.thisWeekPost.length===0){
              this.weekCheck = true;
            }
            this.fetchDatas.postData('/post/view',{user_id:[this.User_id]}).then(data=>{
              this.fetchDatas.getData('/user/authed').then(data=>{
                if(data.user[0].favorites.indexOf(this.User._id)!==-1){
                  this.button = true;
                }
                else
                  this.button = false;
                this.loaded = true;
                loading.dismiss();
              })
            })
          })
        });



    }

    public dismiss() {
        this.viewCtrl.dismiss()
    }

    addFavorite() {
        this.button = true;
        this.try = true;
        this.fetchDatas.postData('/user/favorite',{_id: this.User._id}).then(data=>{
          this.button = true;
          this.try = false;
        });

    }

    removeFavorite(post) {
        this.button = false;
        this.try = true;
        this.fetchDatas.deleteData('/user/favorite',{_id: this.User._id}).then(data=>{
            this.try = false;
        },
          err=>{
          });

    }

    refreshViewCnt(){
        this.today_disable = true;
        this.button_loaded = false;
        this.User_id = this.navParams.get('user_id');
        this.fetchDatas.postData('/user',{users: [this.User_id]}).then(data=>{
          this.User = data[0];
          this.view_cnt = data[0].viewCnt;
          this.button_loaded = true;
          this.today_disable = false;
        });
    }

  presentFavModal(i) {
    let profileModal = this.modalCtrl.create(VotePhotoPage, { postList:this.posts.slice().reverse(),postListIndex:'fit'+i},{leaveAnimation:'back'});
    profileModal.present();

  }

  presentThisWeekModal(i){
    let thisWeekModal = this.modalCtrl.create(VoteThisWeekPage,{thisWeekPost:this.thisWeekPost.slice().reverse(),thisWeekPostIndex:'fit'+i},{leaveAnimation:'back'});
    thisWeekModal.present();
  }



}
