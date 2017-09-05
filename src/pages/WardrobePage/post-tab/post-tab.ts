import {Component, OnInit} from '@angular/core';
import { NavController, NavParams,ModalController,LoadingController,Platform } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {Storage} from '@ionic/storage';
import {WardrobePage} from '../wardrobe/wardrobe'
import { WardrobePhotoPage } from '../../WardrobePage/wardrobe-photo/wardrobe-photo'
import { CameraPage } from '../../CameraPage/Camera/camera';
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";

/**
 * Generated class for the PostTabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-post-tab',
  templateUrl: 'post-tab.html',

})
export class PostTabPage implements OnInit{
  // user: object = {};

  myPost: Array<any> = [];
  weeks: Array<any> = [];
  postAlert:string="";
  date:Array<any> = [];
  check:boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public http: Http,
              public fetchDatas: FetchDataProvider,
              public platform: Platform) {

  }
  ngOnInit(): void {
    this.check=false;
    this.myPost = this.navParams.data.mypost;
    this.postAlert = this.navParams.data.postAlert;
    this.weeks = this.navParams.data.week;


    if(this.myPost.length === 0){
      this.check=true;
    }
  }

  ionViewDidLoad() {
    console.log('----ionViewDidLoad PostTabPage----');


  }
  goToCamera(){
    let cameraModal = this.modalCtrl.create(CameraPage, {fromWardrobe:'check'});
    cameraModal.present();

  }
  presentProfileModal(i) {

      let profileModal = this.modalCtrl.create(WardrobePhotoPage, { postList:this.myPost.slice().reverse(), postListIndex:i,},{leaveAnimation:'back'});
      profileModal.onDidDismiss((check)=>{
        if(check === "check"){
          this.myPost = [];
          let loading = this.loadingCtrl.create({
            showBackdrop: false, spinner: 'crescent',
          });
          this.fetchDatas.getData('/post/myposts').then(data=>{
            for (var i = 0; i < data.posts.length; i++) {
              if (data.posts[i].isThisWeek === true) {
              }
              else {
                this.myPost.push(data.posts[i]);
                this.check = true;
                loading.dismiss();
              }
            }
          });
        }
      });
      profileModal.present();

  }

}
