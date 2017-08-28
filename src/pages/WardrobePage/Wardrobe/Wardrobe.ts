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
    dateFinal: Array<object> = [];
    dateFinal2: Array<object> = [];
    checkThis = 0;
    alertThis: boolean;
    view_cnt: any;
    button_loaded: boolean = false;
    today_disable: boolean = false;
    year: Array<any> = [];
    year2: Array<any> = [];
    startDay: Array<any> = [];
    endDay: Array<any> = [];
    endDay2: Array<any> = [];
    month: Array<any> = [];
    month2: Array<any> = [];

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

    ionViewWillEnter() {
      this.fetchData();

    }

    presentThisWeekModal(i) {
        let thisWeekModal = this.modalCtrl.create(WardrobeThisWeekPage, {
            thisWeekPost: this.thisWeekPost.slice().reverse(),
            thisWeekPostIndex: i,
            date:this.dateFinal2
        }, {leaveAnimation: 'back'});
        thisWeekModal.onDidDismiss((renewedData)=> {
          if(renewedData==="renewed"){
            this.fetchData();
          }
          });
        thisWeekModal.present();
    };

  public fetchData(){
    this.mypostlist = [];
    this.checkRank = false;
    this.thisWeekPost = [];
    this.date = [];
    this.date2 = [];
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

                  for (var i = 0; i < data.posts.length; i++) {
                    //이번주 사진
                    if (data.posts[i].isThisWeek === true) {
                      this.thisWeekPost.push(data.posts[i]);
                      this.date2.push(data.posts[i].writtenAt)

                    }
                    //모든 사진
                    else {
                      this.mypostlist.push(data.posts[i]);
                      this.date.push(data.posts[i].writtenAt)

                    }

                  }
                  if(this.thisWeekPost.length === 0){
                    this.thisWeekPostLength = true;
                  }

                  this.loaded = true;

                  for(var h = 0; h<this.date.length; h++){
                    this.year.push(this.date[h].substring(0,4));
                    this.endDay.push(Number(this.date[h].substring(8,10)));
                    if(this.date[h].substring(5,7)==='01'){
                      this.month.push('Jan')
                    }
                    else if(this.date[h].substring(5,7)==='02'){
                      this.month.push('Feb')
                    }
                    else if(this.date[h].substring(5,7)==='03'){
                      this.month.push('Mar')
                    }
                    else if(this.date[h].substring(5,7)==='04'){
                      this.month.push('Apr')
                    }
                    else if(this.date[h].substring(5,7)==='05'){
                      this.month.push('May')
                    }
                    else if(this.date[h].substring(5,7)==='06'){
                      this.month.push('Jun')
                    }
                    else if(this.date[h].substring(5,7)==='07'){
                      this.month.push('Jul')
                    }
                    else if(this.date[h].substring(5,7)==='08'){
                      this.month.push('Aug')
                    }
                    else if(this.date[h].substring(5,7)==='09'){
                      this.month.push('Sep')
                    }
                    else if(this.date[h].substring(5,7)==='10'){
                      this.month.push('Oct')
                    }
                    else if(this.date[h].substring(5,7)==='11'){
                      this.month.push('Nov')
                    }
                    else if(this.date[h].substring(5,7)==='12'){
                      this.month.push('Dec')
                    }
                    this.dateFinal.push({'sDay':this.startDay[h],'eDay':this.endDay[h],'mon':this.month[h],'yr':this.year[h]})
                  }

                  for(var a = 0; a<this.date2.length; a++){
                    this.year2.push(this.date2[a].substring(0,4));
                    this.endDay2.push(Number(this.date2[a].substring(8,10)));
                    if(this.date2[a].substring(5,7)==='01'){
                      this.month2.push('Jan')
                    }
                    else if(this.date2[a].substring(5,7)==='02'){
                      this.month2.push('Feb')
                    }
                    else if(this.date2[a].substring(5,7)==='03'){
                      this.month2.push('Mar')
                    }
                    else if(this.date2[a].substring(5,7)==='04'){
                      this.month2.push('Apr')
                    }
                    else if(this.date2[a].substring(5,7)==='05'){
                      this.month2.push('May')
                    }
                    else if(this.date2[a].substring(5,7)==='06'){
                      this.month2.push('Jun')
                    }
                    else if(this.date2[a].substring(5,7)==='07'){
                      this.month2.push('Jul')
                    }
                    else if(this.date2[a].substring(5,7)==='08'){
                      this.month2.push('Aug')
                    }
                    else if(this.date2[a].substring(5,7)==='09'){
                      this.month2.push('Sep')
                    }
                    else if(this.date2[a].substring(5,7)==='10'){
                      this.month2.push('Oct')
                    }
                    else if(this.date2[a].substring(5,7)==='11'){
                      this.month2.push('Nov')
                    }
                    else if(this.date2[a].substring(5,7)==='12'){
                      this.month2.push('Dec')
                    }
                    this.dateFinal2.push({'eDay':this.endDay2[a],'mon':this.month2[a],'yr':this.year2[a]})

                  }
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





