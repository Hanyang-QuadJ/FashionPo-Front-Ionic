/**
 * Created by jeonghyunlee on 2017. 8. 9..
 */
import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Content} from 'ionic-angular';
import {Platform, ModalController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Http, Headers,RequestOptions} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

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
    button:boolean = false;
    try:boolean = false;
    view_cnt: any;
    today_disable = false;
    constructor(public viewCtrl: ViewController,
                public fb: FormBuilder,
                public platform: Platform,
                private storage: Storage,
                private http: Http,
                public toastCtrl: ToastController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
    ) {
        this.usernameForm = this.fb.group({
            username: ['', Validators.compose([Validators.required])],

        });
    }

    ngOnInit(): void {
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
                                this.posts = data;
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
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://54.162.160.91/api/user/favorite';
            //   // console.log('yes');
            // }
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
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://54.162.160.91/api/user/favorite';
            //   // console.log('yes');
            // }
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
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://54.162.160.91/api/user';
            //   // console.log('yes');
            // }
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
                    setTimeout(function(){ this.today_disable = false; console.log("!");}, 1000);

                })
        });
    }



}
