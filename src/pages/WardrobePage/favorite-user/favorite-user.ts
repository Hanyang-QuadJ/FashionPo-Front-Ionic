import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ViewController, ModalController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';
import {FavoriteUserPostPage} from '../favorite-user/favorite-user-post/favorite-user-post'
import {FavoriteUserThisWeekPage} from '../favorite-user/favorite-user-this-week/favorite-user-this-week';




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
  posts:Array<any>=[];
  thisWeekPost:Array<any>=[];
  favUsers:any=""
  date:Array<string>=[];
  date2:Array<string>=[];
  year:Array<any>=[];
  year2:Array<any>=[];
  startDay:Array<any>=[];
  endDay:Array<any>=[];
  endDay2:Array<any>=[];
  month:Array<any>=[];
  month2:Array<any>=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, public loadingCtrl:LoadingController,  private storage : Storage, public modalCtrl: ModalController,
              private http: Http
              ) {
  }

  ngOnInit(): void {
    let loading = this.loadingCtrl.create({showBackdrop:false,cssClass:'loading',spinner:'crescent'});
    loading.present();
    this.favUser = this.navParams.get('favList');
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
          for(var i = 0; i<data.length; i++){
            if(data[i].isThisWeek===true){
              this.thisWeekPost.push(data[i]);
              this.date2.push(data[i].writtenAt)
            }
            else if(data[i].isThisWeek === false){
              this.posts.push(data[i]);
              this.date.push(data[i].writtenAt);
            }

          }


          console.log('qwetqwetqwetqwetwqey')
          console.log(this.date2)

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
  presentThisWeekModal(i){
    let thisWeekModal = this.modalCtrl.create(FavoriteUserThisWeekPage,{thisWeekPost:this.thisWeekPost,thisWeekPostIndex:'fit'+i},{leaveAnimation:'back'});
    thisWeekModal.present();
  }





}
