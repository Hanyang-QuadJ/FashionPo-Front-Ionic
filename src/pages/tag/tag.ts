import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController, ModalController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {RankThisWeekPage} from "../RankPage/rank-wardrobe/rank-this-week/rank-this-week";

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
  date = [];
  dateFinal: Array<object> = [];
  order: string = 'likeCnt';
  year: Array<any> = [];
  endDay: Array<any> = [];
  month: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
              private storage:Storage, public http: Http,public loadingCtrl:LoadingController, public modalCtrl:ModalController,) {
    this.tagName = this.navParams.get('tagName');
    let loading = this.loadingCtrl.create({
      showBackdrop: true, spinner: 'crescent',
    });
    loading.present();
    this.tagUser=[];
    this.dateFinal=[];
    this.date=[];
    this.tagUsers=[];
    this.storage.get('token').then((val) => {
      var APIUrl = '/post/tag';
      var APIUrl_2 = '/user';

      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/post/tag';
      //   APIUrl_2 = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/user';
      //
      // }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      const body = {
        tag:this.tagName
      };

      this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {
            this.tagPics = data;
            for(let i = 0; i<data.length; i++){
              this.likeCntArray.push(data[i].likeCnt);
              this.tagUser.push(data[i].writtenBy);
              this.date.push(data[i].writtenAt);
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
              this.dateFinal.push({'eDay':this.endDay[h],'mon':this.month[h],'yr':this.year[h]})
            }
            this.maxLike = Math.max(...this.likeCntArray);
            for(let j = 0; j<data.length; j++){
              if(data[j].likeCnt === this.maxLike){
                this.firstTag=data[j];

              }
            }
            const body2={users:this.tagUser};
            this.http.post(APIUrl_2, JSON.stringify(body2), {headers: headers})
              .map(res => res.json())
              .subscribe(
                data => {
                  for(let j = 0; j<data.length; j++){
                    this.tagUsers.push(data[j]);
                  }
                  const body3 = {users:[this.firstTag.writtenBy]};
                  this.http.post(APIUrl_2, JSON.stringify(body3), {headers: headers})
                    .map(res => res.json())
                    .subscribe(
                      data => {
                        this.firstUser = data[0];
                        console.log(this.firstUser);
                        loading.dismiss();
                      });
                });



          });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagPage');
  }
  public dismiss(){
    let check = "check";
    this.viewCtrl.dismiss(check);
  }
  presentList(i){
    let listModal = this.modalCtrl.create(RankThisWeekPage,
      {thisWeekPost:this.tagPics,thisWeekPostIndex:'fit'+i,date:this.dateFinal,pageCheck:this.tagName,user:this.tagUsers});
    listModal.present();
  }

}
