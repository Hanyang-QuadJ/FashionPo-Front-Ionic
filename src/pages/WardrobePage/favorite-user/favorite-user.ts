import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ViewController, ModalController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';
import {FavoriteUserPostPage} from '../favorite-user/favorite-user-post/favorite-user-post'




/**
 * Generated class for the FavoriteUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite-user',
  templateUrl: 'favorite-user.html',
})
export class FavoriteUserPage implements OnInit{
  favUser:any=""
  posts:any=""
  favUsers:any=""


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, public loadingCtrl:LoadingController,  private storage : Storage, public modalCtrl: ModalController,
              private http: Http
              ) {
  }

  ngOnInit(): void {
    let loading = this.loadingCtrl.create({showBackdrop:false,cssClass:'loading',spinner:'crescent'});
    loading.present();
    this.favUser = this.navParams.get('favList');
    console.log(this.favUser);
    this.storage.get('token').then((val) => {
      var APIUrl = '/post/userid';
      var APIUrl_1 = '/user'
      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://54.162.160.91/api/rank';
      //   // console.log('yes');
      // }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      let body = {
        _id:this.favUser._id
      }
      this.http.post(APIUrl,JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.posts = data;
        });

      let body2 = {
        users:this.favUser.favorites
      }

      this.http.post(APIUrl_1,JSON.stringify(body2),{headers:headers})
        .map(res => res.json())
        .subscribe(data => {


          this.favUsers = data;
          console.log('&^%^$$%$%')
          console.log(this.favUsers)
          loading.dismiss();
        });




    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteUserPage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }

  presentFavModal(i) {
    let profileModal = this.modalCtrl.create(FavoriteUserPostPage, { postList:this.posts,postListIndex:'fit'+i},{leaveAnimation:'back'});
    profileModal.present();

  }



}
