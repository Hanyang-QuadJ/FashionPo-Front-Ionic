import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,LoadingController,ModalController,Platform } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {RankPhotoPage} from "./rank-photo/rank-photo";
import {RankThisWeekPage} from "./rank-this-week/rank-this-week";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";


/**
 * Generated class for the RankWardrobePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-rank-wardrobe',
  templateUrl: 'rank-wardrobe.html',
})
export class RankWardrobePage {
  ranks:any="";

  user_id:any="";
  weekCheck:boolean;
  posts: Array<object> = [];
  thisWeekPost: Array<object> = [];
  user:any="";
  min:Number=null;
  rank:Array<any>=[];
  rankNumber:any="";
  top:Array<any>=[];
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl:ViewController,private http: Http, private storage:Storage,
              public loadingCtrl:LoadingController,
              public modalCtrl:ModalController,
              public fetchDatas : FetchDataProvider,
              public platform: Platform,) {
    this.user_id = this.navParams.get('user_id');
    this.ranks = this.navParams.get('ranks');
    this.rank = this.navParams.get('rank');
    this.rankNumber = this.navParams.get('rankNumber');
    this.weekCheck = false;
    this.posts=[];
    this.thisWeekPost=[];
    if(this.user_id===undefined){
      this.date=[];
      this.date2=[];
      this.top=[];
      this.posts=[];
      this.thisWeekPost=[];
      let loading = this.loadingCtrl.create({showBackdrop:true,cssClass:'loading',spinner:'crescent'});
      loading.present();
      for(let i = 0; i<this.rank.length; i++){
        if(this.rank[i].writtenBy === this.ranks._id){
          this.top.push(i+1)
        }
      }
      this.min = Math.min(...this.top);
      this.fetchDatas.postData('/user',{users: [this.ranks._id]}).then(data=>{
        this.user = data[0]
      });
      this.fetchDatas.postData('/post/userid',{_id:[this.ranks._id]}).then(data=>{
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
        loading.dismiss();

      });

    }

    else if(this.user_id!==undefined){
      let loading = this.loadingCtrl.create({showBackdrop:false,cssClass:'loading',spinner:'crescent'});
      loading.present();
      this.posts=[];
      this.thisWeekPost=[];

      this.fetchDatas.postData('/user',{users: [this.user_id._id]}).then(data=>{
        this.user = data[0]
      });

      this.fetchDatas.postData('/post/userid',{_id:this.user_id._id}).then(data=>{
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
        loading.dismiss();

      });




    }
  }
  ionViewWillEnter(){


  }







  ionViewDidLoad() {
    console.log('ionViewDidLoad RankWardrobePage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }

  presentFavModal(i) {
    let profileModal = this.modalCtrl.create(RankPhotoPage, { postList:this.posts.slice().reverse(),postListIndex:'fit'+i},{leaveAnimation:'back'});
    profileModal.present();

  }

  presentThisWeekModal(i){
    let thisWeekModal = this.modalCtrl.create(RankThisWeekPage,{thisWeekPost:this.thisWeekPost.slice().reverse(),thisWeekPostIndex:'fit'+i},{leaveAnimation:'back'});
    thisWeekModal.present();
  }




}
