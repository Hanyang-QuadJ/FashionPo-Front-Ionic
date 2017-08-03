import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {PostTabPage} from "../post-tab/post-tab";
import {FavoriteTabPage} from "../favorite-tab/favorite-tab";
import {SettingsPage} from "../settings/settings";
// import {TabsPage} from "../tabs/tabs";
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})

export class RegisterPage implements OnInit {



    user: object = {};
    mypostlist: Array<object> = [];
    option: string = "";
    myposts: string = "";
    favorites: Array<object> = [];
    favoritesLength: string = "";
    tab1:any = PostTabPage;
    tab2:any = FavoriteTabPage;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                private http: Http,
                public platform: Platform) {

    }

    ngOnInit(): void {
        var APIUrl_1 = '/user';
        var APIUrl_2 = '/post';
        // if (this.platform.is('ios') == true){
        //   APIUrl = 'http://54.162.160.91/api/user';
        // }
        this.option = "favorites";
        this.storage.get('token').then((val) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            // console.log(val);

            this.http.get(APIUrl_1 + '/authed', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.user = data.user[0];
                });

            this.http.get(APIUrl_2 + '/myposts', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.mypostlist = data.posts;
                    this.myposts = data.posts.length;
                });

            this.http.get(APIUrl_1 + '/favorite', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.favorites = data.favorites;
                    console.log(this.favorites);
                    this.favoritesLength = data.favorites.length;
                  console.log(this.favoritesLength);
                });
        });
    }
    Settings() {
      this.navCtrl.push(SettingsPage);
    }
    ionViewWillEnter() {
        var APIUrl_1 = '/user';
        var APIUrl_2 = '/post';
        // if (this.platform.is('ios') == true){
        //   APIUrl = 'http://54.162.160.91/api/user';
        // }
        this.option = "view";
        this.storage.get('token').then((val) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            // console.log(val);

            this.http.get(APIUrl_1 + '/authed', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.user = data.user[0];
                });

            this.http.get(APIUrl_2 + '/myposts', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.mypostlist = data.posts;
                    this.myposts = data.posts.length;
                });
          this.http.get(APIUrl_1 + '/favorite', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
              this.favorites = data.favorites;

              this.favoritesLength = data.favorites.length;
            });
        });
    }
}





