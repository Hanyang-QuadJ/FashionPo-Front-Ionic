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
  dateFinal:Array<any>=[];
  dateFinal2:Array<any>=[];

  year:Array<any>=[];
  year2:Array<any>=[];
  startDay:Array<any>=[];
  endDay:Array<any>=[];
  endDay2:Array<any>=[];
  month:Array<any>=[];
  month2:Array<any>=[];
  checkPost:boolean;
  checkThis:any="";
  alertThis:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, public loadingCtrl:LoadingController,  private storage : Storage, public modalCtrl: ModalController,
              private http: Http
              ) {
  }

  ngOnInit(): void {
    let loading = this.loadingCtrl.create({showBackdrop:false,cssClass:'loading',spinner:'crescent'});
    loading.present();
    this.checkThis = 0;
    this.checkPost=false;
    this.alertThis=false;
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

            }

            else if(data[i].isThisWeek === false){
              this.posts.push(data[i]);

            }

          }
          for(var h = 0; h<this.date.length; h++){
            this.year.push(this.date[h].substring(0,4));
            this.endDay.push(Number(this.date[h].substring(8,10)));
            if(this.date[h].substring(5,7)==='01'){
              this.month.push('Jan')
            }
            else if(this.date[h].substring(5,7)==='02'){
              this.month.push('Feb')
            }
            else if(this.date[h].substring(5,7)==='03'){
              this.month.push('Mar')
            }
            else if(this.date[h].substring(5,7)==='04'){
              this.month.push('Apr')
            }
            else if(this.date[h].substring(5,7)==='05'){
              this.month.push('May')
            }
            else if(this.date[h].substring(5,7)==='06'){
              this.month.push('Jun')
            }
            else if(this.date[h].substring(5,7)==='07'){
              this.month.push('Jul')
            }
            else if(this.date[h].substring(5,7)==='08'){
              this.month.push('Aug')
            }
            else if(this.date[h].substring(5,7)==='09'){
              this.month.push('Sep')
            }
            else if(this.date[h].substring(5,7)==='10'){
              this.month.push('Oct')
            }
            else if(this.date[h].substring(5,7)==='11'){
              this.month.push('Nov')
            }
            else if(this.date[h].substring(5,7)==='12'){
              this.month.push('Dec')
            }
            this.dateFinal.push({'sDay':this.startDay[h],'eDay':this.endDay[h],'mon':this.month[h],'yr':this.year[h]})
          }

          for(var a = 0; a<this.date2.length; a++){
            this.year2.push(this.date2[a].substring(0,4));
            this.endDay2.push(Number(this.date2[a].substring(8,10)));
            if(this.date2[a].substring(5,7)==='01'){
              this.month2.push('Jan')
            }
            else if(this.date2[a].substring(5,7)==='02'){
              this.month2.push('Feb')
            }
            else if(this.date2[a].substring(5,7)==='03'){
              this.month2.push('Mar')
            }
            else if(this.date2[a].substring(5,7)==='04'){
              this.month2.push('Apr')
            }
            else if(this.date2[a].substring(5,7)==='05'){
              this.month2.push('May')
            }
            else if(this.date2[a].substring(5,7)==='06'){
              this.month2.push('Jun')
            }
            else if(this.date2[a].substring(5,7)==='07'){
              this.month2.push('Jul')
            }
            else if(this.date2[a].substring(5,7)==='08'){
              this.month2.push('Aug')
            }
            else if(this.date2[a].substring(5,7)==='09'){
              this.month2.push('Sep')
            }
            else if(this.date2[a].substring(5,7)==='10'){
              this.month2.push('Oct')
            }
            else if(this.date2[a].substring(5,7)==='11'){
              this.month2.push('Nov')
            }
            else if(this.date2[a].substring(5,7)==='12'){
              this.month2.push('Dec')
            }
            this.dateFinal2.push({'eDay':this.endDay2[a],'mon':this.month2[a],'yr':this.year2[a]})

          }




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
    let profileModal = this.modalCtrl.create(FavoriteUserPostPage, { postList:this.posts,postListIndex:'fit'+i, date:this.date},{leaveAnimation:'back'});
    profileModal.present();

  }
  presentThisWeekModal(i){
    let thisWeekModal = this.modalCtrl.create(FavoriteUserThisWeekPage,{thisWeekPost:this.thisWeekPost,thisWeekPostIndex:'fit'+i,date:this.date},{leaveAnimation:'back'});
    thisWeekModal.present();
  }





}
