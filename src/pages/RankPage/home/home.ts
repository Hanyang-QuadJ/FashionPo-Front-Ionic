import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, App, Content, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {VotePage} from '../../VotePage/vote/vote'
import {SearchUserPage} from '../search-user/search-user'
import {SearchTagsPage} from '../search-tags/search-tags'
import {ToastController, ModalController, ViewController, Toast, Modal} from 'ionic-angular'

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',


})


export class HomePage implements OnInit {

    ranks: Array<any> = [];
    users: Array<any> = [];
    buttons: Array<any> = [];
    picURL: string = "";
    writtenBys: Array<any> = [];
    @ViewChild(Content) content: Content;

    private toastInstance: Toast;
    private modalInstance: Modal;
    public toggled: boolean;
    public searchToggled: boolean;
    tab1 = SearchUserPage;
    tab2 = SearchTagsPage;
    pushPage: any;
    user: any;
    loading: any;
    firstPost: object;
    firstUser: object;
    search: string = "";


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                private http: Http,
                public platform: Platform,
                private toastCtrl: ToastController,
                public modalCtrl: ModalController,
                private app: App,
                public loadingCtrl: LoadingController,
                public viewCtrl: ViewController) {





    }

    ngOnInit(): void {

    }

    ionViewWillEnter() {
      this.pushPage = VotePage;
      this.toggled = false;
      this.searchToggled = false;
      let loading = this.loadingCtrl.create({});
      loading.present();
      this.storage.get('token').then((val) => {
        var APIUrl = '/rank';
        // if (this.platform.is('ios') == true){
        //   APIUrl = 'http://54.162.160.91/api/rank';
        //   // console.log('yes');
        // }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', val);


        this.http.get(APIUrl, {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            for (var i = 1; i < data.posts.length; i++) {
              this.ranks[i - 1] = data.posts[i];
            }
            this.firstPost = data.posts[0];
            this.storage.get('token').then((val) => {
              let APIUrl = '/user';
              // if (this.platform.is('ios') == true){
              //   APIUrl = 'http://54.162.160.91/api/user';
              //   // console.log('yes');
              // }
              for (let i = 0; i < data.posts.length; i++) {
                this.writtenBys.push(data.posts[i].writtenBy);
              }
              console.log(this.writtenBys);
              let body = {users: this.writtenBys};
              let headers = new Headers();
              headers.append('Content-Type', 'application/json');
              headers.append('x-access-token', val);


              this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                  console.log(data)
                  console.log('********')
                  this.firstUser = data[0];
                  for (let i = 1; i < data.length; i++) {
                    this.users.push(data[i]);
                  }

                  console.log(this.ranks)
                  console.log(this.users)
                  // console.log(this.firstUser);
                  // console.log(this.users[1]);
                  // console.log(this.firstPost);
                  // console.log(this.ranks);
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
                        this.user = data.user[0];
                        for (let i = 0; i < this.ranks.length; i++)
                          this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
                        console.log("-------------------");
                        console.log(this.buttons);
                        console.log("-------------------");
                        loading.dismiss();

                      });
                  });

                });
            });
          });
      });





    }


    Vote() {
        this.navCtrl.parent.parent.setRoot(VotePage, {}, {
            animate: true,
            animation: 'ios-transition',
            direction: 'back'
        });

    }

    toggleSearch() {
        this.toggled = this.toggled ? false : true;
        this.searchToggled = true;
      this.search="User"
    }

    toggleSearch2() {
        this.toggled = this.toggled ? false : true;
        this.searchToggled = false;
    }

    searchActive() {
        this.searchToggled = true;
    }

    scrollToTop() {
        this.content.scrollToTop();
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.pushPage = VotePage;
        this.toggled = false;
        this.searchToggled = false;
        let loading = this.loadingCtrl.create({});

        this.storage.get('token').then((val) => {
            var APIUrl = '/rank';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://54.162.160.91/api/rank';
            //   // console.log('yes');
            // }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);


            this.http.get(APIUrl, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    for (var i = 1; i < data.posts.length; i++) {
                        this.ranks[i - 1] = data.posts[i];
                    }
                    this.firstPost = data.posts[0];
                    this.storage.get('token').then((val) => {
                        let APIUrl = '/user';
                        // if (this.platform.is('ios') == true){
                        //   APIUrl = 'http://54.162.160.91/api/user';
                        //   // console.log('yes');
                        // }
                        for (let i = 0; i < data.posts.length; i++) {
                            this.writtenBys.push(data.posts[i].writtenBy);
                        }
                        console.log(this.writtenBys);
                        let body = {users: this.writtenBys};
                        let headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        headers.append('x-access-token', val);


                        this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                            .map(res => res.json())
                            .subscribe(data => {
                                console.log(data)
                                console.log('********')
                                this.firstUser = data[0];
                                for (let i = 1; i < data.length; i++) {
                                    this.users.push(data[i]);
                                }

                                console.log(this.ranks)
                                console.log(this.users)
                                // console.log(this.firstUser);
                                // console.log(this.users[1]);
                                // console.log(this.firstPost);
                                // console.log(this.ranks);
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
                                            this.user = data.user[0];
                                            for (let i = 0; i < this.ranks.length; i++)
                                                this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
                                            console.log("-------------------");
                                            console.log(this.buttons);
                                            console.log("-------------------");
                                            refresher.complete();


                                        });
                                });

                            });
                    });

                });
        });


    }

    addFavorite(post) {
        console.log(post);
        for(let i = 0;i<this.users.length;i++){
            if(this.users[i]._id === post.writtenBy){
                if(this.buttons[i]===true) {
                    this.buttons[i] = false;
                }
                else
                    this.buttons[i] = true;
            }
        }
        console.log("----------------");
        console.log(this.buttons);
        console.log("----------------");
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
                _id: post.writtenBy
            };


            this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data);
                    // this.storage.get('token').then((val) => {
                    //     let APIUrl = '/user';
                    //     // if (this.platform.is('ios') == true){
                    //     //   APIUrl = 'http://54.162.160.91/api/user';
                    //     //   // console.log('yes');
                    //     // }
                    //
                    //     console.log(this.writtenBys);
                    //     let body = {users: this.writtenBys};
                    //     let headers = new Headers();
                    //     headers.append('Content-Type', 'application/json');
                    //     headers.append('x-access-token', val);
                    //
                    //
                    //     this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                    //         .map(res => res.json())
                    //         .subscribe(data => {
                    //             console.log(data)
                    //             console.log('********')
                    //
                    //             this.firstUser = data[0];
                    //             this.users = [];
                    //             for (let i = 1; i < data.length; i++) {
                    //                 this.users.push(data[i]);
                    //             }
                    //             console.log(this.ranks)
                    //             console.log(this.users)
                    //             // console.log(this.firstUser);
                    //             // console.log(this.users[1]);
                    //             // console.log(this.firstPost);
                    //             // console.log(this.ranks);
                    //             this.storage.get('token').then((val) => {
                    //                 let APIUrl = '/user/authed';
                    //                 // if (this.platform.is('ios') == true){
                    //                 //   APIUrl = 'http://54.162.160.91/api/user/authed';
                    //                 //   // console.log('yes');
                    //                 // }
                    //                 let headers = new Headers();
                    //                 headers.append('Content-Type', 'application/json');
                    //                 headers.append('x-access-token', val);
                    //
                    //
                    //                 this.http.get(APIUrl, {headers: headers})
                    //                     .map(res => res.json())
                    //                     .subscribe(data => {
                    //                         this.user = data.user[0];
                    //                         for (let i = 0; i < this.ranks.length; i++)
                    //                             this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
                    //                         console.log("-------------------");
                    //                         console.log(this.buttons);
                    //                         console.log("-------------------");
                    //                     });
                    //             });
                    //         });
                    // });

                });

        });
    }

    removeFavorite(post) {
        console.log(post);
        for(let i = 0;i<this.users.length;i++){
            if(this.users[i]._id === post.writtenBy){
                if(this.buttons[i]===true) {
                    this.buttons[i] = false;
                }
                else
                    this.buttons[i] = true;
            }
        }
        console.log("----------------");
        console.log(this.buttons);
        console.log("----------------");
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
                _id: post.writtenBy
            });
            let options = new RequestOptions({
                headers: headers,
                body: body
            });

            this.http.delete(APIUrl, options)
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data);
                    // this.storage.get('token').then((val) => {
                    //     let APIUrl = '/user';
                    //     // if (this.platform.is('ios') == true){
                    //     //   APIUrl = 'http://54.162.160.91/api/user';
                    //     //   // console.log('yes');
                    //     // }
                    //
                    //     console.log(this.writtenBys);
                    //     let body = {users: this.writtenBys};
                    //     let headers = new Headers();
                    //     headers.append('Content-Type', 'application/json');
                    //     headers.append('x-access-token', val);
                    //
                    //
                    //     this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                    //         .map(res => res.json())
                    //         .subscribe(data => {
                    //             console.log(data)
                    //             console.log('********')
                    //
                    //             this.firstUser = data[0];
                    //             this.users = [];
                    //             for (let i = 1; i < data.length; i++) {
                    //                 this.users.push(data[i]);
                    //             }
                    //             console.log(this.ranks)
                    //             console.log(this.users)
                    //             // console.log(this.firstUser);
                    //             // console.log(this.users[1]);
                    //             // console.log(this.firstPost);
                    //             // console.log(this.ranks);
                    //             this.storage.get('token').then((val) => {
                    //                 let APIUrl = '/user/authed';
                    //                 // if (this.platform.is('ios') == true){
                    //                 //   APIUrl = 'http://54.162.160.91/api/user/authed';
                    //                 //   // console.log('yes');
                    //                 // }
                    //                 let headers = new Headers();
                    //                 headers.append('Content-Type', 'application/json');
                    //                 headers.append('x-access-token', val);
                    //
                    //
                    //                 this.http.get(APIUrl, {headers: headers})
                    //                     .map(res => res.json())
                    //                     .subscribe(data => {
                    //                         this.user = data.user[0];
                    //                         for (let i = 0; i < this.ranks.length; i++)
                    //                             this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
                    //                         console.log("-------------------");
                    //                         console.log(this.buttons);
                    //                         console.log("-------------------");
                    //                     });
                    //             });
                    //         });
                    // });
                });
        });
    }


}
