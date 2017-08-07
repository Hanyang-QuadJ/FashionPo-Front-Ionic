import {Component, OnInit, ViewChild} from '@angular/core';
import { NavController, NavParams, Platform,App,Content,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VotePage } from '../../VotePage/vote/vote'
import { SearchUserPage } from '../search-user/search-user'
import { SearchTagsPage } from '../search-tags/search-tags'
import { ToastController, ModalController, ViewController,Toast,Modal } from 'ionic-angular'
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



export class HomePage implements OnInit{

  ranks: Array<object> = [];
  users: Array<object> = [];
  picURL: string = "";
  @ViewChild(Content) content: Content;

  private toastInstance: Toast;
  private modalInstance: Modal;
  public toggled: boolean;
  public searchToggled: boolean;
  tab1 = SearchUserPage;
  tab2 = SearchTagsPage;
  pushPage: any;
  user: object;
  loading: any;
  firstPost: object;
  firstUser: object;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage : Storage,
    private http: Http,
    public platform: Platform,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private app:App,
    public loadingCtrl:LoadingController,
    public viewCtrl: ViewController ) {


  }
  ngOnInit(): void {

    this.pushPage = VotePage;
    this.toggled = false;
    this.searchToggled = false;
    let loading = this.loadingCtrl.create({
    });
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
          for(var i=1;i<data.posts.length;i++) {
            this.ranks[i-1] = data.posts[i];
          }
          this.firstPost = data.posts[0];
          this.storage.get('token').then((val) => {
            let APIUrl = '/user';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://54.162.160.91/api/user';
            //   // console.log('yes');
            // }
            let writtenBys = [];
            for(let i=0;i<data.posts.length;i++){
              writtenBys.push(data.posts[i].writtenBy);
            }
            console.log(writtenBys);
            let body = {users:writtenBys};
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);


            this.http.post(APIUrl,JSON.stringify(body),{headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                  console.log(data)
                  console.log('********')
                  this.firstUser = data[0];
                  for(let i =1;i<data.length;i++){
                    this.users.push(data[i]);
                  }
                  console.log(this.ranks)
                  console.log(this.users)
                  // console.log(this.firstUser);
                  // console.log(this.users[1]);
                  // console.log(this.firstPost);
                  // console.log(this.ranks);
                  loading.dismiss();
                });
          });

        });
    });

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
            // console.log(this.user);
          });
    });




  }

  abc(){
    console.log("!!@!@#!@#!@$!@#!@$");
  }

  // ionViewWillEnter() {
  //
  //
  //   this.storage.get('token').then((val) => {
  //     var APIUrl = '/rank';
  //     // if (this.platform.is('ios') == true){
  //     //   APIUrl = 'http://54.162.160.91/api/rank';
  //     //   // console.log('yes');
  //     // }
  //     let headers = new Headers();
  //     headers.append('Content-Type', 'application/json');
  //     headers.append('x-access-token', val);
  //
  //
  //     this.http.get(APIUrl, {headers: headers})
  //         .map(res => res.json())
  //         .subscribe(data => {
  //           for(var i=1;i<data.posts.length;i++) {
  //             this.ranks[i-1] = data.posts[i];
  //           }
  //           this.firstPost = data.posts[0];
  //           this.storage.get('token').then((val) => {
  //             let APIUrl = '/user';
  //             // if (this.platform.is('ios') == true){
  //             //   APIUrl = 'http://54.162.160.91/api/user';
  //             //   // console.log('yes');
  //             // }
  //             let writtenBys = [];
  //             for(let i=0;i<data.posts.length;i++){
  //               writtenBys.push(data.posts[i].writtenBy);
  //             }
  //             // console.log(writtenBys);
  //             let body = {users:writtenBys};
  //             let headers = new Headers();
  //             headers.append('Content-Type', 'application/json');
  //             headers.append('x-access-token', val);
  //
  //
  //             this.http.post(APIUrl,JSON.stringify(body),{headers: headers})
  //                 .map(res => res.json())
  //                 .subscribe(data => {
  //                   this.firstUser = data[0];
  //                   for(let i =1;i<data.length;i++){
  //                     this.users.push(data[i]);
  //                   }
  //                   // console.log(this.firstUser);
  //                   // console.log(this.users[1]);
  //                   // console.log(this.firstPost);
  //                   // console.log(this.ranks);
  //                 });
  //           });
  //
  //         });
  //   });


  // }


  Vote(){

    this.navCtrl.parent.parent.setRoot(VotePage,  {}, {animate: true, animation:'ios-transition', direction: 'back'});

  }


  presentCustomModal() {
    if(this.modalInstance) {
      return;
    }

    this.modalInstance = this.modalCtrl.create(VotePage,{

    },);

    this.modalInstance.onDidDismiss(() => {
      this.modalInstance = null;
    });

    this.modalInstance.present();
  }


  toggleSearch() {
    this.toggled = this.toggled ? false : true;
    this.searchToggled = true;
  }

  toggleSearch2() {
    this.toggled = this.toggled ? false : true;
    this.searchToggled = false;
  }

  searchActive (){
    this.searchToggled = true;
    console.log(this.searchToggled)

  }
  test(){
    console.log('1!!!!!!!!111')
  }
  ionViewWillLeave(){

  }

  scrollToTop(){
    this.content.scrollToTop();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.pushPage = VotePage;
    this.toggled = false;
    this.searchToggled = false;
    let loading = this.loadingCtrl.create({
    });
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
          for(var i=1;i<data.posts.length;i++) {
            this.ranks[i-1] = data.posts[i];
          }
          this.firstPost = data.posts[0];
          this.storage.get('token').then((val) => {
            let APIUrl = '/user';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://54.162.160.91/api/user';
            //   // console.log('yes');
            // }
            let writtenBys = [];
            for(let i=0;i<data.posts.length;i++){
              writtenBys.push(data.posts[i].writtenBy);
            }
            console.log(writtenBys);
            let body = {users:writtenBys};
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);


            this.http.post(APIUrl,JSON.stringify(body),{headers: headers})
              .map(res => res.json())
              .subscribe(data => {
                console.log(data)
                console.log('********')

                this.firstUser = data[0];
                this.users = [];
                for(let i =1;i<data.length;i++){
                  this.users.push(data[i]);
                }
                console.log(this.ranks)
                console.log(this.users)
                // console.log(this.firstUser);
                // console.log(this.users[1]);
                // console.log(this.firstPost);
                // console.log(this.ranks);
                loading.dismiss();
              });
          });

        });
    });

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
          // console.log(this.user);
          refresher.complete();
        });
    });




  }

  addFavorite(post){
    console.log(post);
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
        _id:post.writtenBy
      };


      this.http.post(APIUrl,JSON.stringify(body), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            console.log(data);
          });
    });
  }













}
