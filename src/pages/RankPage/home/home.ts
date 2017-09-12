import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, App, Content, LoadingController,} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {VotePage} from '../../VotePage/vote/vote'
import {ToastController, ModalController, ViewController, Toast, Modal} from 'ionic-angular';
import {HistoryListPage} from '../history-list/history-list'
import {RankWardrobePage} from "../rank-wardrobe/rank-wardrobe";
import {TagPage} from "../../tag/tag";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";

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

  modalCheck: boolean;
  rankDate: any = "";


  ranks: Array<any> = [];
  oriRank: Array<any> = [];
  users: Array<any> = [];
  buttons: Array<any> = [];
  picURL: string = "";

  order: string = 'tagCnt';
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
  rankEmpty:boolean;

  firstButton: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private http: Http,
              public fetchDatas: FetchDataProvider,
              public platform: Platform,
              private toastCtrl: ToastController,
              public modalCtrl: ModalController,
              private app: App,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController) {
    this.search = "user";
    this.historyRank = this.navParams.get('rankSheet');
  }

  ngOnInit(): void {

  }

  ionViewWillEnter(){
    console.log('Rank Data Check');
    this.firstCheck = false;
    this.modalCheck = false;
    this.users = [];
    this.ranks = [];
    this.oriRank = [];
    this.writtenBys = [];
    this.search = "User";
    this.pushPage = VotePage;
    this.toggled = false;
    this.rankEmpty = false;
    this.searchToggled = false;
    this.initializeItems();
    //Fetch Data Start!
    if (this.historyRank === undefined) {
      let loading = this.loadingCtrl.create({showBackdrop: true, cssClass: 'loading', spinner: 'crescent'});
      loading.present();
      this.fetchDatas.getData('/rank').then(data => {

        if(data.posts === undefined || data.posts.length === 0){
          this.rankEmpty = true;
          loading.dismiss();
        }
        for (let d = 0; d < data.posts.length; d++) {
          this.oriRank[d] = data.posts[d];
        }
        for (var i = 1; i < data.posts.length; i++) {
          this.ranks[i - 1] = data.posts[i];
        }
        this.firstPost = data.posts[0];
        for (let i = 0; i < data.posts.length; i++) {
          this.writtenBys.push(data.posts[i].writtenBy);
        }
        this.fetchDatas.postData('/user', {users: this.writtenBys}).then(data => {
          this.firstUser = data[0];
          this.users = [];
          for (let i = 1; i < data.length; i++) {
            this.users.push(data[i]);
          }
          this.fetchDatas.getData('/user/authed').then(data => {
            this.user = data.user[0];
            if (this.firstUser._id === this.user._id) {
              this.firstCheck = true;

            }
            for (let i = 0; i < this.ranks.length; i++)
              this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
            this.firstButton = this.user.favorites.indexOf(this.firstPost.writtenBy) !== -1;
            loading.dismiss();
          })
        })
      });
    }
    //History Rank!
    else if (this.historyRank !== undefined) {
      let loading = this.loadingCtrl.create({showBackdrop: true, cssClass: 'loading', spinner: 'crescent'});
      loading.present();
      this.modalCheck = true;
      this.rankDate = this.navParams.get('rankDate');
      for (let a = 0; a < this.historyRank.length; a++) {
        this.oriRank[a] = this.historyRank[a];
      }
      for (var i = 1; i < this.historyRank.length; i++) {
        this.ranks[i - 1] = this.historyRank[i];
      }
      this.firstPost = this.historyRank[0];
      for (let i = 0; i < this.historyRank.length; i++) {
        this.writtenBys.push(this.historyRank[i].writtenBy);
      }
      this.fetchDatas.postData('/user', {users: this.writtenBys}).then(data => {
        this.firstUser = data[0];
        this.users = [];
        for (let i = 1; i < data.length; i++) {
          this.users.push(data[i]);
        }
        this.fetchDatas.getData('/user/authed').then(data => {
          this.user = data.user[0];
          if (this.firstUser._id === this.user._id) {
            this.firstCheck = true;
            // console.log(this.firstCheck);
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
          loading.dismiss();
        })
      })
    }
  }

  //Refresher
  doRefresh(refresher) {
    this.firstCheck = false;
    this.modalCheck = false;
    this.users = [];
    this.ranks = [];
    this.oriRank = [];
    this.writtenBys = [];
    this.search = "User";
    this.pushPage = VotePage;
    this.toggled = false;
    this.searchToggled = false;
    this.initializeItems();
    this.fetchDatas.getData('/rank').then(data => {
      for (let d = 0; d < data.posts.length; d++) {
        this.oriRank[d] = data.posts[d];
      }
      for (var i = 1; i < data.posts.length; i++) {
        this.ranks[i - 1] = data.posts[i];
      }
      this.firstPost = data.posts[0];
      for (let i = 0; i < data.posts.length; i++) {
        this.writtenBys.push(data.posts[i].writtenBy);
      }
      this.fetchDatas.postData('/user', {users: this.writtenBys}).then(data => {
        this.firstUser = data[0];
        this.users = [];
        for (let i = 1; i < data.length; i++) {
          this.users.push(data[i]);
        }
        this.fetchDatas.getData('/user/authed').then(data => {
          this.user = data.user[0];
          if (this.firstUser._id === this.user._id) {
            this.firstCheck = true;

          }
          for (let i = 0; i < this.ranks.length; i++)
            this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
          this.firstButton = this.user.favorites.indexOf(this.firstPost.writtenBy) !== -1;
          refresher.complete();
        })
      })
    });
  }
  //Favorite Functions

  addFavorite(post) {
    this.try = true;
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
    this.fetchDatas.postData('/user/favorite',{_id:post.writtenBy}).then(data=>{
      this.try = false;
    });

  }

  removeFavorite(post) {
    this.try = true;
    // console.log(post);
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
    this.fetchDatas.deleteData('/user/favorite',{_id:post.writtenBy}).then(data=>{
      this.try = false;
    });

  }
  //Search
  allUsers;
  allTags;

  initializeItems() {
    this.fetchDatas.getData('/user/all').then(data=>{
      this.allUsers = data.usersList;
    });

  }

  getItems(ev) {
    this.fetchDatas.getData('/user/all').then(data=>{
      this.allUsers = data.usersList;
      var val = ev.target.value;
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.allUsers = this.allUsers.filter((item) => {
          return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    });
    this.fetchDatas.getData('/search/searchTag/'+ev.target.value).then(data=>{
      this.allTags = data.message;
    })

  }

  //PresentModals
  presentHistoryModal() {
    let historyModal = this.modalCtrl.create(HistoryListPage, {}, {leaveAnimation: 'back'});
    historyModal.present();
  }

  presentWardrobeModal(i) {
    let WardrobeModal = this.modalCtrl.create(RankWardrobePage, {
      ranks: this.users[i],
      rankNumber: i + 2,
      rank: this.oriRank
    }, {leaveAnimation: 'back'});
    WardrobeModal.present();
  }

  presentFirstModal() {
    let profileModal = this.modalCtrl.create(RankWardrobePage, {
      ranks: this.firstUser,
      rank: this.oriRank
    }, {leaveAnimation: 'back'});
    profileModal.present();

  }
  public dismiss() {
    this.viewCtrl.dismiss()
  }

  presentSearchModal(i) {
    let searchModal = this.modalCtrl.create(RankWardrobePage, {user_id: this.allUsers[i]}, {leaveAnimation: 'back'});
    searchModal.present();
  }

  goToTag(tagName) {
    console.log(tagName);
    let tagModal = this.modalCtrl.create(TagPage, {tagName: tagName});
    tagModal.present();

  }

  Vote() {
    this.navCtrl.parent.parent.setRoot(VotePage,{},{animate:true,direction:'back'});

  }

  //Toggles & scrolls
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

  scrollToTop() {
    this.content.scrollToTop();
  }
}
