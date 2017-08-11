import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform, ModalController,LoadingController} from 'ionic-angular';
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


export class WardrobePage {
  public toggled: boolean;

    user: object = {};
    loaded:boolean;
    loadedd:boolean;
    mypostlist: Array<object> = [];
    thisWeekPost: Array<object> =[];
    option: string = "";
    myposts: string = "";
    favorites: Array<object> = [];
    favoritesLength: string = "";
    postAlert:string="";
    tab1:any = PostTabPage;
    tab2:any = FavoriteTabPage;
    date:Array<string>=[];
    date2:Array<string>=[];
    dateFinal:Array<object>=[];
    checkThis=0;
    alertThis:boolean;


    year:Array<any>=[];
    year2:Array<any>=[];
    startDay:Array<any>=[];
    endDay:Array<any>=[];
    endDay2:Array<any>=[];
    month:Array<any>=[];
    month2:Array<any>=[];



    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                private http: Http,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController,
                public platform: Platform) {






    }

  toggleRank() {
    this.toggled = this.toggled ? false : true;

  }
    Settings() {

      this.navCtrl.push(SettingsPage,{users:this.user},{});
    }
 ionViewWillEnter(){
   console.log("11111111111")

   this.mypostlist=[]
   this.thisWeekPost=[]



   this.loaded = false;
   this.loadedd = false;

   this.option = "favorites";
   let loading = this.loadingCtrl.create({showBackdrop:false,spinner:'crescent',

   });

   loading.present();
   this.storage.get('token').then((val) => {
     var APIUrl = '/user';
     var APIUrl_2 = '/post';
     // if (this.platform.is('ios') == true){
     //   APIUrl = 'http://54.162.160.91/api/user';
     //   APIUrl_2 = 'http://54.162.160.91/api/post';
     // }

     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('x-access-token', val);
     // console.log(val);

     this.http.get(APIUrl+'/authed', {headers: headers})
       .map(res => res.json())
       .subscribe(data => {
         this.user = data.user[0];

       });


     this.http.get(APIUrl_2+'/myposts', {headers: headers})
       .map(res => res.json())
       .subscribe(data => {


           for (var i = 0; i<data.posts.length;i++){
             //이번주 사진
             if(data.posts[i].isThisWeek===true){
               this.thisWeekPost.push(data.posts[i])
             }
             //모든 사진
             else {
               this.mypostlist.push(data.posts[i]);
             }

         }

         this.loaded = true;



       });

     this.http.get(APIUrl+'/favorite', {headers: headers})
       .map(res => res.json())
       .subscribe(data => {
         if(data.favorites === undefined || data.favorites.length == 0){
           this.favorites = [];
           this.loadedd = true;
           loading.dismiss();
         }
         else{
           const body = {users:data.favorites};
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

 }
    ionViewDidLoad(){

    }
    ionViewDidLeave(){
      this.mypostlist=[]
      this.thisWeekPost=[]
    }
    presentThisWeekModal(i){
      let thisWeekModal = this.modalCtrl.create(WardrobeThisWeekPage,{thisWeekPost:this.thisWeekPost,thisWeekPostIndex:'fit'+i},{leaveAnimation:'back'});
      thisWeekModal.present();
    }

}





