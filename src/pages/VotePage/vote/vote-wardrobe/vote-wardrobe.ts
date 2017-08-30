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
        this.storage.get('token').then((val) => {
            var APIUrl = '/user';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://54.162.160.91/api/user';
            //   // console.log('yes');
            // }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            let body = {
                users:[this.User_id]
            }
            this.http.post(APIUrl,JSON.stringify(body), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.User = data[0];
                    console.log("--------------------");
                    console.log(this.User);
                    console.log("--------------------");
                    this.storage.get('token').then((val) => {
                        var APIUrl = '/post/userid';
                        // if (this.platform.is('ios') == true){
                        //   APIUrl = 'http://54.162.160.91/api/post/userid';
                        //   // console.log('yes');
                        // }
                        let headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        headers.append('x-access-token', val);
                        let body = {
                            _id:[this.User_id]
                        }
                        this.http.post(APIUrl,JSON.stringify(body), {headers: headers})
                            .map(res => res.json())
                            .subscribe(data => {
                              for(var i = 0; i<data.length;i++){
                                if(data[i].isThisWeek===true){
                                  this.thisWeekPost.push(data[i]);
                                  this.date2.push(data[i].writtenAt)
                                }
                                else{
                                  this.posts.push(data[i]);
                                  this.date.push(data[i].writtenAt)
                                }
                              }
                              if(this.thisWeekPost.length===0){
                                this.weekCheck = true;
                              }

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

                                this.storage.get('token').then((val) => {
                                    var APIUrl = '/post/view';
                                    // if (this.platform.is('ios') == true){
                                    //   APIUrl = 'http://54.162.160.91/api/post/view';
                                    //   // console.log('yes');
                                    // }
                                    let headers = new Headers();
                                    headers.append('Content-Type', 'application/json');
                                    headers.append('x-access-token', val);
                                    let body = {
                                        user_id:[this.User_id]
                                    }
                                    this.http.post(APIUrl,JSON.stringify(body), {headers: headers})
                                        .map(res => res.json())
                                        .subscribe(data => {
                                            console.log(data);
                                            this.storage.get('token').then((val) => {
                                                let APIUrl = '/user/authed';
                                                // if (this.platform.is('ios') == true){
                                                //   APIUrl = 'http://54.162.160.91/api/user/authed';
                                                //   // console.log('yes');
                                                // }
                                                let headers = new Headers();
                                                headers.append('Content-Type', 'application/json');
                                                headers.append('x-access-token', val);


                                                this.http.get(APIUrl, {headers: headers})
                                                    .map(res => res.json())
                                                    .subscribe(data => {
                                                        console.log(data.user[0].favorites.indexOf(this.User._id));
                                                        if(data.user[0].favorites.indexOf(this.User._id)!==-1){
                                                            this.button = true;
                                                        }
                                                        else
                                                            this.button = false;
                                                        this.loaded = true;
                                                        loading.dismiss();

                                                    });
                                            });

                                        });

                                });
                            });

                    });
                });

        });


    }

    public dismiss() {
        this.viewCtrl.dismiss()
    }

    addFavorite() {
        this.button = true;
        this.try = true;
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/favorite';
            if (this.platform.is('ios') == true){
              APIUrl = 'http://54.162.160.91/api/user/favorite';
              // console.log('yes');
            }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            let body = {
                _id: this.User._id
            };


            this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data);
                    this.button = true;
                    this.try = false;

                });

        });
    }

    removeFavorite(post) {

        this.button = false;
        this.try = true;
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/favorite';
            if (this.platform.is('ios') == true){
              APIUrl = 'http://54.162.160.91/api/user/favorite';
              // console.log('yes');
            }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            let body = JSON.stringify({
                _id: this.User._id
            });
            let options = new RequestOptions({
                headers: headers,
                body: body
            });

            this.http.delete(APIUrl, options)
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data);
                    this.try = false;

                });
        });
    }

    refreshViewCnt(){
        this.today_disable = true;
        this.button_loaded = false;
        this.User_id = this.navParams.get('user_id');
        this.storage.get('token').then((val) => {
            var APIUrl = '/user';
            if (this.platform.is('ios') == true){
              APIUrl = 'http://54.162.160.91/api/user';
              // console.log('yes');
            }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            let body = {
                users: [this.User_id]
            }
            this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.User = data[0];

                    this.view_cnt = data[0].viewCnt;
                    this.button_loaded = true;
                    this.today_disable = false;


                })
        });
    }

  presentFavModal(i) {
    let profileModal = this.modalCtrl.create(VotePhotoPage, { postList:this.posts.slice().reverse(),postListIndex:'fit'+i,date:this.dateFinal.slice().reverse()},{leaveAnimation:'back'});
    profileModal.present();

  }

  presentThisWeekModal(i){
    let thisWeekModal = this.modalCtrl.create(VoteThisWeekPage,{thisWeekPost:this.thisWeekPost.slice().reverse(),thisWeekPostIndex:'fit'+i,date:this.dateFinal2.slice().reverse()},{leaveAnimation:'back'});
    thisWeekModal.present();
  }



}
