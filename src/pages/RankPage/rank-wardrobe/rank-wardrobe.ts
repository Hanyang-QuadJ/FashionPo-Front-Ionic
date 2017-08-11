import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,LoadingController,ModalController, } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {RankPhotoPage} from "./rank-photo/rank-photo";
import {RankThisWeekPage} from "./rank-this-week/rank-this-week";


/**
 * Generated class for the RankWardrobePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-rank-wardrobe',
  templateUrl: 'rank-wardrobe.html',
})
export class RankWardrobePage {
  ranks:any="";
  posts:any="";
  thisWeekPost:any="";
  user:any="";


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl:ViewController,private http: Http, private storage:Storage,
              public loadingCtrl:LoadingController,
              public modalCtrl:ModalController) {
    this.ranks = this.navParams.get('ranks')
    this.posts=[];
    this.thisWeekPost=[];
    let loading = this.loadingCtrl.create({showBackdrop:false,cssClass:'loading',spinner:'crescent'});
    loading.present();




    this.storage.get('token').then((val) => {
      var APIUrl = '/user';
      var APIUrl2 = '/post/userid'

      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://54.162.160.91/api/user';
      //   APIUrl_2 = 'http://54.162.160.91/api/post';
      // }

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      const body = {users: [this.ranks._id]}

      this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {
            this.user = data[0]
            console.log('!!!!!!!')
            console.log(this.user)
          });

      const body2 = {_id:this.ranks._id}
      this.http.post(APIUrl2,JSON.stringify(body2), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          for(var i = 0; i<data.length;i++){
            if(data[i].isThisWeek===true){
              this.thisWeekPost.push(data[i])
            }
            else{
              this.posts.push(data[i])
            }

          }



        });




    });
    loading.dismiss();

  }







  ionViewDidLoad() {
    console.log('ionViewDidLoad RankWardrobePage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }

  presentFavModal(i) {
    let profileModal = this.modalCtrl.create(RankPhotoPage, { postList:this.posts,postListIndex:'fit'+i},{leaveAnimation:'back'});
    profileModal.present();

  }

  presentThisWeekModal(i){
    let thisWeekModal = this.modalCtrl.create(RankThisWeekPage,{thisWeekPost:this.thisWeekPost,thisWeekPostIndex:'fit'+i},{leaveAnimation:'back'});
    thisWeekModal.present();
  }




}
