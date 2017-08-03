import {Component, OnInit} from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VotePage } from '../vote/vote'
import { MyrankPage } from '../myrank/myrank';
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
  picURL: string = "";

  private toastInstance: Toast;
  private modalInstance: Modal;
  public toggled: boolean;
  public searchToggled: boolean;
  tab1 = SearchUserPage;
  tab2 = SearchTagsPage;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage : Storage,
    private http: Http,
    public platform: Platform,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController ) {

  }
  ngOnInit(): void {
    this.toggled = false;
    this.searchToggled = false;
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
          this.picURL = data.posts[0].picURL;
        });
    });

  }

  abc(){
    console.log("!!@!@#!@#!@$!@#!@$");
  }

  ionViewWillEnter() {
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
          this.picURL = data.posts[0].picURL;
        });
    });

  }
  Vote(){
    this.navCtrl.setRoot(VotePage,  {}, {animate: true, direction: 'back'});
  }


  // presentCustomModal() {
  //   if(this.modalInstance) {
  //     return;
  //   }
  //
  //   this.modalInstance = this.modalCtrl.create(MyrankPage,{
  //
  //   },{cssClass:'custom-modal-page'});
  //
  //   this.modalInstance.onDidDismiss(() => {
  //     this.modalInstance = null;
  //   });
  //
  //   this.modalInstance.present();
  // }


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

  addFavorite(writtenBy,userName){
    console.log(writtenBy);
    this.storage.get('token').then((val) => {
      var APIUrl = '/user/favorite';
      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://54.162.160.91/api/rank';
      //   // console.log('yes');
      // }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      let body = {
        _id:writtenBy
      };

      this.http.post(APIUrl,JSON.stringify(body), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            console.log(data);
          });
    });
  }









}
