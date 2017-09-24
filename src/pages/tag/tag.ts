import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController, ModalController,Platform } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {RankThisWeekPage} from "../RankPage/rank-wardrobe/rank-this-week/rank-this-week";
import {TagListPage} from "./tag-list/tag-list";
import {FavoriteUserPage} from "../WardrobePage/favorite-user/favorite-user";
import {FetchDataProvider} from "../../providers/fetch-data/fetch-data";


/**
 * Generated class for the TagPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tag',
  templateUrl: 'tag.html',
})
export class TagPage {
  tagName:any="";
  firstTag:any="";
  maxLike:Number=null;
  likeCntArray:Array<any>=[];
  tagPics:Array<any>=[];
  tagUser:Array<any>=[];
  tagUsers:Array<any>=[];
  firstUser:any="";
  // testString:any = document.createElement("BUTTON");

  selectedLike:Array<any>=[];
  selectedUserId:Array<any>=[];
  selectedUser:Array<any>=[];
  finalSelectedLike:Array<any>=[];
  isLike:boolean;
  order: string = 'likeCnt';
  orderDate:string = 'writtenAt';


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
              private storage:Storage,public fetchDatas: FetchDataProvider, public http: Http,public loadingCtrl:LoadingController, public modalCtrl:ModalController,
              public platform:Platform) {
    this.tagName = this.navParams.get('tagName');
    let loading = this.loadingCtrl.create({
      showBackdrop: true, spinner: 'crescent',enableBackdropDismiss:true
    });


    loading.present();

    // document.getElementById("tagging")[0].appendChild(btn);


    this.tagUser=[];
    this.tagUsers=[];
    this.fetchDatas.postData('/post/tag',{tag:this.tagName}).then(data=>{
      this.tagPics = data;
      // console.log("Check!!");
      // console.log(this.tagPics);
      for(let i = 0; i<data.length; i++){
        if(data[i].likeCnt > 50){
          this.selectedLike.push(data[i]);
          this.likeCntArray.push(data[i].likeCnt);
        }
        this.tagUser.push(data[i].writtenBy);
      }
      if (this.selectedLike === [] || this.selectedLike.length===0 ){
        this.isLike=true;
      }
      else{
        this.finalSelectedLike = this.selectedLike.sort(function (a, b) {
          return a.likeCnt < b.likeCnt ? -1 : a.likeCnt > b.likeCnt ? 1 : 0;
        });

        for(let i = 0; i<this.selectedLike.length; i++){
          this.selectedUserId.push(this.finalSelectedLike[i].writtenBy)
        }
        this.isLike=false;
      }
      this.maxLike = Math.max(...this.likeCntArray);
      for(let j = 0; j<this.selectedLike.length; j++){
        if(this.selectedLike[j].likeCnt === this.maxLike){
          this.firstTag=this.selectedLike[j];
        }
      }
      this.fetchDatas.postData('/user',{users:this.selectedUserId}).then(data=>{
        for(let j = 0; j<data.length; j++){
          this.selectedUser.push(data[j]);
        }
      });
      this.fetchDatas.postData('/user',{users:this.tagUser}).then(data=>{
        for(let j = 0; j<data.length; j++){
          this.tagUsers.push(data[j]);
        }
        loading.dismiss();
      });
    });


  }

  ionViewDidLoad() {
    // // console.log('ionViewDidLoad TagPage');
  }
  public dismiss(){
    let check = "check";
    this.viewCtrl.dismiss(check);
  }
  presentList(i){
    let listModal = this.modalCtrl.create(TagListPage,
      {thisWeekPost:this.finalSelectedLike.slice().reverse() ,thisWeekPostIndex:'fit'+i, pageCheck:this.tagName,like:'like',user:this.selectedUser.slice().reverse()});
    listModal.present();
  }

  presentNormal(i){
    let listModal = this.modalCtrl.create(TagListPage,
      {thisWeekPost:this.tagPics.slice().reverse() ,thisWeekPostIndex:'fit'+i, pageCheck:this.tagName,user:this.tagUsers.slice().reverse()});
    listModal.present();
  }


}
