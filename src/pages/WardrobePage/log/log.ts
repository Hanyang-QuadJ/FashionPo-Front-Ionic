import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import {Storage} from '@ionic/storage';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {FavoriteUserPage} from "../favorite-user/favorite-user";

/**
 * Generated class for the LogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage {
  followers_id:any;
  followers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
              public fetchData : FetchDataProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    let loading = this.loadingCtrl.create({
      showBackdrop: true, spinner: 'crescent',
    });
    loading.present();

    this.fetchData.getData('/user/favoriteme').then(data=>{
      if(data.favoriteMe===[] || data.favoriteMe.length === 0){
        loading.dismiss();
      }
      else{
        this.followers_id = data.favoriteMe;
        console.log(this.followers_id);
        this.fetchData.postData('/user',{users:this.followers_id}).then(data=>{
          console.log(data);
          this.followers = data;
          loading.dismiss();
        })
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogPage');
  }
  public dismiss(){
    this.viewCtrl.dismiss();
  }
  presentModal(i){
    // console.log(i,this.followers_id[0]);
    // console.log(i,this.followers_id[1]);
    let modal = this.modalCtrl.create(FavoriteUserPage,{favList:this.followers[i]});
    modal.present();
  }

}
