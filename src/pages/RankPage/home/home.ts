import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, App, Content, LoadingController, } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {VotePage} from '../../VotePage/vote/vote'
import {ToastController, ModalController, ViewController, Toast, Modal} from 'ionic-angular';
import {HistoryListPage} from '../history-list/history-list'
import {RankWardrobePage} from "../rank-wardrobe/rank-wardrobe";

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

    modalCheck:boolean;
    rankDate:any="";

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

    pushPage: any;
    user: any;
    loading: any;
    historyRank: any;
  firstCheck: boolean;

    firstPost: any;
    firstUser: any;
    search: string = "";
    try: boolean = false;
    nameCheck: Array<any> = [];

    firstButton: boolean;


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
        this.search = "User";
        this.historyRank = this.navParams.get('rankSheet')


        this.initializeItems();
    }

    ngOnInit(): void {


    }

    ionViewWillEnter() {
      this.firstCheck = false;
       this.modalCheck= false;
        this.users = [];
        this.ranks = [];
        this.writtenBys = [];

        this.search = "User";
        this.pushPage = VotePage;

        this.toggled = false;
        this.searchToggled = false;


        if(this.historyRank===undefined){
          console.log("Yeahhh!!!");

          let loading = this.loadingCtrl.create({showBackdrop: true, cssClass: 'loading', spinner: 'crescent'});
          loading.present();




          this.storage.get('token').then((val) => {
            var APIUrl = '/rank';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://107.23.122.155:3000/api/rank';
            //   // console.log('yes');
            // }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);


            this.http.get(APIUrl, {headers: headers})
              .map(res => res.json())
              .subscribe(data => {
                console.log("$$$$$")
                console.log(data)
                for (var i = 1; i < data.posts.length; i++) {
                  this.ranks[i - 1] = data.posts[i];
                }
                this.firstPost = data.posts[0];
                this.storage.get('token').then((val) => {
                  let APIUrl = '/user';
                  // if (this.platform.is('ios') == true){
                  //   APIUrl = 'http://107.23.122.155:3000/api/user';
                  //   // console.log('yes');
                  // }
                  for (let i = 0; i < data.posts.length; i++) {
                    this.writtenBys.push(data.posts[i].writtenBy);
                  }

                  let body = {users: this.writtenBys};
                  let headers = new Headers();
                  headers.append('Content-Type', 'application/json');
                  headers.append('x-access-token', val);


                  this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                    .map(res => res.json())
                    .subscribe(data => {


                      this.firstUser = data[0];
                      this.users = [];
                      for (let i = 1; i < data.length; i++) {
                        this.users.push(data[i]);
                      }


                      // console.log(this.firstUser);
                      // console.log(this.users[1]);
                      // console.log(this.firstPost);
                      // console.log(this.ranks);
                      this.storage.get('token').then((val) => {
                        let APIUrl = '/user/authed';
                        // if (this.platform.is('ios') == true){
                        //   APIUrl = 'http://107.23.122.155:3000/api/user/authed';
                        //   // console.log('yes');
                        // }
                        let headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        headers.append('x-access-token', val);


                        this.http.get(APIUrl, {headers: headers})
                          .map(res => res.json())
                          .subscribe(data => {
                            this.user = data.user[0];
                            console.log("------------------");
                            console.log(this.firstUser._id);
                            console.log(this.user._id);
                            console.log("------------------");
                          if (this.firstUser._id === this.user._id) {
                            this.firstCheck = true;
                            console.log(this.firstCheck);
                           }




                            for (let i = 0; i < this.ranks.length; i++)
                              this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
                            this.firstButton = this.user.favorites.indexOf(this.firstPost.writtenBy) !== -1
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
        else if(this.historyRank!==undefined){
          this.modalCheck=true;
          this.rankDate = this.navParams.get('rankDate');
          let loading = this.loadingCtrl.create({showBackdrop: false, cssClass: 'loading', spinner: 'crescent'});
          loading.present();
          for (var i = 1; i < this.historyRank.length; i++) {
            this.ranks[i - 1] = this.historyRank[i];

          }
          console.log('111111111')
          console.log(this.ranks)
          this.firstPost = this.historyRank[0];
          for (let i = 0; i < this.historyRank.length; i++) {
            this.writtenBys.push(this.historyRank[i].writtenBy);
          }
          console.log('222222222222')
          console.log(this.writtenBys)

          this.storage.get('token').then((val) => {
            var APIUrl = '/user';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://107.23.122.155:3000/api/user';
            //   // console.log('yes');
            // }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            let body = {users: this.writtenBys}
            this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
              .map(res => res.json())
              .subscribe(data => {
                this.firstUser = data[0];
                this.users = [];
                for (let i = 1; i < data.length; i++) {
                  this.users.push(data[i]);
                }


                this.storage.get('token').then((val) => {
                  let APIUrl = '/user/authed';
                  // if (this.platform.is('ios') == true){
                  //   APIUrl = 'http://107.23.122.155:3000/api/user/authed';
                  //   // console.log('yes');
                  // }
                  let headers = new Headers();
                  headers.append('Content-Type', 'application/json');
                  headers.append('x-access-token', val);


                  this.http.get(APIUrl, {headers: headers})
                    .map(res => res.json())
                    .subscribe(data => {
                      this.user = data.user[0];
                      if (this.firstUser._id === this.user._id) {
                        this.firstCheck = true;
                        console.log(this.firstCheck);
                      }

                      for (let j = 0; j < this.ranks.length; j++) {
                        this.nameCheck[j] = false;
                        if (this.ranks[j].writtenBy === this.user._id) {
                          this.nameCheck[j] = true;
                        }
                      }
                      for (let i = 0; i < this.ranks.length; i++)
                        this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
                      this.firstButton = this.user.favorites.indexOf(this.firstPost.writtenBy) !== -1;
                      console.log("-------------------");
                      console.log(this.buttons);
                      console.log("-------------------");
                      loading.dismiss();

                    });
                });


              })


          });

        }


    }

    test() {
        console.log('Check!!Check!!')
    }


    Vote() {

        let voteModal = this.modalCtrl.create(VotePage,  {leaveAnimation: 'back'});
        voteModal.present();



    }

    toggleSearch() {

        this.toggled = this.toggled ? false : true;
        this.searchToggled = true;

        this.content.resize();
    }

    toggleSearch2() {
        this.toggled = this.toggled ? false : true;
        this.searchToggled = false;
        this.content.resize();
    }

    searchActive() {
        this.searchToggled = true;
    }

    scrollToTop() {
        this.content.scrollToTop();
    }

    doRefresh(refresher) {
      this.storage.get('token').then((val) => {
        var APIUrl = '/rank';
        // if (this.platform.is('ios') == true){
        //   APIUrl = 'http://107.23.122.155:3000/api/rank';
        //   // console.log('yes');
        // }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', val);


        this.http.get(APIUrl, {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            console.log("$$$$$")
            console.log(data)
            for (var i = 1; i < data.posts.length; i++) {
              this.ranks[i - 1] = data.posts[i];
            }
            this.firstPost = data.posts[0];
            this.storage.get('token').then((val) => {
              let APIUrl = '/user';
              // if (this.platform.is('ios') == true){
              //   APIUrl = 'http://107.23.122.155:3000/api/user';
              //   // console.log('yes');
              // }
              for (let i = 0; i < data.posts.length; i++) {
                this.writtenBys.push(data.posts[i].writtenBy);
              }

              let body = {users: this.writtenBys};
              let headers = new Headers();
              headers.append('Content-Type', 'application/json');
              headers.append('x-access-token', val);


              this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {


                  this.firstUser = data[0];
                  this.users = [];
                  for (let i = 1; i < data.length; i++) {
                    this.users.push(data[i]);
                  }


                  // console.log(this.firstUser);
                  // console.log(this.users[1]);
                  // console.log(this.firstPost);
                  // console.log(this.ranks);
                  this.storage.get('token').then((val) => {
                    let APIUrl = '/user/authed';
                    // if (this.platform.is('ios') == true){
                    //   APIUrl = 'http://107.23.122.155:3000/api/user/authed';
                    //   // console.log('yes');
                    // }
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('x-access-token', val);


                    this.http.get(APIUrl, {headers: headers})
                      .map(res => res.json())
                      .subscribe(data => {
                        this.user = data.user[0];
                        console.log("------------------");
                        console.log(this.firstUser._id);
                        console.log(this.user._id);
                        console.log("------------------");
                        if (this.firstUser._id === this.user._id) {
                          this.firstCheck = true;
                          console.log(this.firstCheck);
                        }




                        for (let i = 0; i < this.ranks.length; i++)
                          this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
                        this.firstButton = this.user.favorites.indexOf(this.firstPost.writtenBy) !== -1
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
        this.try = true;
        console.log(post);
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]._id === post.writtenBy) {
                if (this.buttons[i] === true) {
                    this.buttons[i] = false;
                }
                else
                    this.buttons[i] = true;
            }
        }
        if (this.firstUser._id === post.writtenBy) {
            if (this.firstButton === true) {
                this.firstButton = false;
            }
            else
                this.firstButton = true;
        }
        console.log("----------------");
        console.log(this.buttons);
        console.log("----------------");
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/favorite';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://107.23.122.155:3000/api/user/favorite';
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
                    this.try = false;

                });

        });
    }

    removeFavorite(post) {
        this.try = true;
        console.log(post);
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]._id === post.writtenBy) {
                if (this.buttons[i] === true) {
                    this.buttons[i] = false;
                }
                else
                    this.buttons[i] = true;
            }
        }
        if (this.firstUser._id === post.writtenBy) {
            if (this.firstButton === true) {
                this.firstButton = false;
            }
            else
                this.firstButton = true;
        }
        console.log("----------------");
        console.log(this.buttons);
        console.log("----------------");
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/favorite';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://107.23.122.155:3000/api/user/favorite';
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
                    this.try = false;

                });
        });
    }

    presentHistoryModal() {
        let historyModal = this.modalCtrl.create(HistoryListPage, {}, {leaveAnimation: 'back'});
        historyModal.present();
    }

    presentWardrobeModal(i) {
        let WardrobeModal = this.modalCtrl.create(RankWardrobePage, {ranks: this.users[i], rankNumber:i+2}, {leaveAnimation: 'back'});
        WardrobeModal.present();
    }

    presentFirstModal() {
        let profileModal = this.modalCtrl.create(RankWardrobePage, {ranks: this.firstUser}, {leaveAnimation: 'back'});
        profileModal.present();

    }
    presentSearchModal(i){
      let searchModal = this.modalCtrl.create(RankWardrobePage,{user_id:this.allUsers[i]},{leaveAnimation:'back'});
      searchModal.present();
    }
    test2(i){
      console.log(this.allUsers[i])
    }

    allUsers;
    allTags;

    initializeItems() {
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/all';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://107.23.122.155:3000/api/user/all';
            //   // console.log('yes');
            // }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);

            this.http.get(APIUrl, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.allUsers = data.usersList;

                });
        });

    }
    public dismiss(){
      this.viewCtrl.dismiss()
    }

    getItems(ev) {
        // Reset items back to all of the items
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/all';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://107.23.122.155:3000/api/user/all';
            //   // console.log('yes');
            // }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);

            var APIUrl2 = '/search/searchTag';
            // if (this.platform.is('ios') == true){
            //   APIUrl2 = 'http://107.23.122.155:3000/api/search/searchTag';
            //   // console.log('yes');
            // }

            let body = {
                searchParam: ev.target.value
            };


            this.http.post(APIUrl2, JSON.stringify(body), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.allTags = data.message;
                });
            this.http.get(APIUrl, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.allUsers = data.usersList;
                    var val = ev.target.value;

                    // if the value is an empty string don't filter the items
                    if (val && val.trim() != '') {
                        this.allUsers = this.allUsers.filter((item) => {
                            return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
                        })
                    }
                });
        });

        // set val to the value of the ev target

    }

}
