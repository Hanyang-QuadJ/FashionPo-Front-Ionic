import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController} from 'ionic-angular';
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
  followers_id: any;
  followers: any;
  isNewAdd: Array<boolean>;
  isAdd:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public fetchData: FetchDataProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.fetchNew();

  }

  fetchNew() {
    let loading = this.loadingCtrl.create({
      showBackdrop: true, spinner: 'crescent',enableBackdropDismiss:true

    });
    loading.present();

    this.fetchData.getData('/user/favoriteme').then(data => {
      if (data.favoriteMe === [] || data.favoriteMe.length === 0) {
        loading.dismiss();
        this.isAdd = true;
      }
      else {
        this.followers_id = data.favoriteMe;
        this.fetchData.postData('/user', {users: this.followers_id}).then(data => {
          this.followers = data;
          this.fetchData.getData('/user/authed').then(data => {
            this.isNewAdd = [];
            let user: Array<any> = data.user[0].addNews;
            if (data.user[0].addNews === [] || data.user[0].addNews.length === 0) {

              for (let i = 0; i < this.followers.length; i++) {
                this.isNewAdd.push(false);
              }
            }
            else {
              for (let i = 0; i < this.followers.length; i++) {
                if (user.indexOf(this.followers.slice().reverse()[i]._id) === -1) {
                  this.isNewAdd.push(false)
                }
                else if (user.indexOf(this.followers.slice().reverse()[i]._id) > -1) {
                  this.isNewAdd.push(true)
                }
              }
            }


          });


          loading.dismiss();
        })
      }
    })

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LogPage');
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  presentModal(i) {
    if (this.isNewAdd[i] === true) {
      let modal = this.modalCtrl.create(FavoriteUserPage, {favList: this.followers.slice().reverse()[i], addDismiss: 'addDismiss'});
      modal.onDidDismiss(() => {
        this.fetchNew();
      });
      modal.present();

    }
    else {
      let modal = this.modalCtrl.create(FavoriteUserPage, {favList: this.followers.slice().reverse()[i]});
      modal.present();
    }


  }

}
