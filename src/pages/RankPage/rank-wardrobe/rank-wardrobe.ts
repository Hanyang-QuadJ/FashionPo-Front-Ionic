import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,LoadingController,ModalController,Platform } from 'ionic-angular';
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

  user_id:any="";
  weekCheck:boolean;
  posts: Array<object> = [];
  thisWeekPost: Array<object> = [];
  user:any="";
  rankNumber:any="";
  date: Array<string> = [];
  date2: Array<string> = [];
  dateFinal: Array<object> = [];
  dateFinal2: Array<object> = [];
  year: Array<any> = [];
  year2: Array<any> = [];
  startDay: Array<any> = [];
  endDay: Array<any> = [];
  endDay2: Array<any> = [];
  month: Array<any> = [];
  month2: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl:ViewController,private http: Http, private storage:Storage,
              public loadingCtrl:LoadingController,
              public modalCtrl:ModalController,
              public platform: Platform,) {
    this.user_id = this.navParams.get('user_id');
    this.ranks = this.navParams.get('ranks');
    this.rankNumber = this.navParams.get('rankNumber');
    this.weekCheck = false;

    if(this.user_id===undefined){
      console.log("GoGoGo");
      this.date=[];
      this.date2=[];

      this.posts=[];
      this.thisWeekPost=[];
      let loading = this.loadingCtrl.create({showBackdrop:false,cssClass:'loading',spinner:'crescent'});
      loading.present();
      this.storage.get('token').then((val) => {
        var APIUrl = '/user';
        var APIUrl2 = '/post/userid';

        // if (this.platform.is('ios') == true){
        //   APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/user';
        //   APIUrl2 = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/post/userid';
        //
        // }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', val);
        const body = {users: [this.ranks._id]};

        this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
          .map(res => res.json())
          .subscribe(
            data => {
              this.user = data[0]


            });

        const body2 = {_id:[this.ranks._id]};

        this.http.post(APIUrl2,JSON.stringify(body2), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            console.log(data)
            for(var i = 0; i<data.length;i++){
              if(data[i].isThisWeek===true){
                this.thisWeekPost.push(data[i]);
                this.date2.push(data[i].writtenAt)
              }
              else{
                this.posts.push(data[i]);
                this.date.push(data[i].writtenAt)
              }

            }
            if(this.thisWeekPost.length===0){
              this.weekCheck = true;
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
            console.log('!!!!!!!');
            console.log(this.thisWeekPost);
            console.log('???????');
            console.log(this.posts);



          });




      });
      loading.dismiss();

    }

    else if(this.user_id!==undefined){
      console.log("StopStopStop");
      this.date=[];
      this.date2=[];

      this.posts=[];
      this.thisWeekPost=[];
      this.storage.get('token').then((val) => {

        var APIUrl = '/post/userid';
        var APIUrl2 = '/user';

        // if (this.platform.is('ios') == true){
        //   APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/post/userid';
        //   APIUrl2 = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/user';
        // }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', val);
        const body = {users: [this.user_id]};

        this.http.post(APIUrl2, JSON.stringify(body), {headers: headers})
          .map(res => res.json())
          .subscribe(
            data => {
              this.user = data[0]


            });

        const body2 = {_id: [this.user_id]};

        this.http.post(APIUrl, JSON.stringify(body2), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
              if (data[i].isThisWeek === true) {
                this.thisWeekPost.push(data[i]);
                this.date2.push(data[i].writtenAt)
              }
              else {
                this.posts.push(data[i]);
                this.date.push(data[i].writtenAt)
              }

            }
            if(this.thisWeekPost.length===0){
              this.weekCheck = true;
            }
            for (var h = 0; h < this.date.length; h++) {
              this.year.push(this.date[h].substring(0, 4));
              this.endDay.push(Number(this.date[h].substring(8, 10)));
              if (this.date[h].substring(5, 7) === '01') {
                this.month.push('Jan')
              }
              else if (this.date[h].substring(5, 7) === '02') {
                this.month.push('Feb')
              }
              else if (this.date[h].substring(5, 7) === '03') {
                this.month.push('Mar')
              }
              else if (this.date[h].substring(5, 7) === '04') {
                this.month.push('Apr')
              }
              else if (this.date[h].substring(5, 7) === '05') {
                this.month.push('May')
              }
              else if (this.date[h].substring(5, 7) === '06') {
                this.month.push('Jun')
              }
              else if (this.date[h].substring(5, 7) === '07') {
                this.month.push('Jul')
              }
              else if (this.date[h].substring(5, 7) === '08') {
                this.month.push('Aug')
              }
              else if (this.date[h].substring(5, 7) === '09') {
                this.month.push('Sep')
              }
              else if (this.date[h].substring(5, 7) === '10') {
                this.month.push('Oct')
              }
              else if (this.date[h].substring(5, 7) === '11') {
                this.month.push('Nov')
              }
              else if (this.date[h].substring(5, 7) === '12') {
                this.month.push('Dec')
              }
              this.dateFinal.push({
                'sDay': this.startDay[h],
                'eDay': this.endDay[h],
                'mon': this.month[h],
                'yr': this.year[h]
              })
            }

            for (var a = 0; a < this.date2.length; a++) {
              this.year2.push(this.date2[a].substring(0, 4));
              this.endDay2.push(Number(this.date2[a].substring(8, 10)));
              if (this.date2[a].substring(5, 7) === '01') {
                this.month2.push('Jan')
              }
              else if (this.date2[a].substring(5, 7) === '02') {
                this.month2.push('Feb')
              }
              else if (this.date2[a].substring(5, 7) === '03') {
                this.month2.push('Mar')
              }
              else if (this.date2[a].substring(5, 7) === '04') {
                this.month2.push('Apr')
              }
              else if (this.date2[a].substring(5, 7) === '05') {
                this.month2.push('May')
              }
              else if (this.date2[a].substring(5, 7) === '06') {
                this.month2.push('Jun')
              }
              else if (this.date2[a].substring(5, 7) === '07') {
                this.month2.push('Jul')
              }
              else if (this.date2[a].substring(5, 7) === '08') {
                this.month2.push('Aug')
              }
              else if (this.date2[a].substring(5, 7) === '09') {
                this.month2.push('Sep')
              }
              else if (this.date2[a].substring(5, 7) === '10') {
                this.month2.push('Oct')
              }
              else if (this.date2[a].substring(5, 7) === '11') {
                this.month2.push('Nov')
              }
              else if (this.date2[a].substring(5, 7) === '12') {
                this.month2.push('Dec')
              }
              this.dateFinal2.push({'eDay': this.endDay2[a], 'mon': this.month2[a], 'yr': this.year2[a]})

            }
            console.log('!!!!!!!');
            console.log(this.thisWeekPost);
            console.log('???????');
            console.log(this.posts)
          });
      });


    }
  }
  ionViewWillEnter(){


  }







  ionViewDidLoad() {
    console.log('ionViewDidLoad RankWardrobePage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }

  presentFavModal(i) {
    let profileModal = this.modalCtrl.create(RankPhotoPage, { postList:this.posts.slice().reverse(),postListIndex:'fit'+i, date:this.dateFinal},{leaveAnimation:'back'});
    profileModal.present();

  }

  presentThisWeekModal(i){
    let thisWeekModal = this.modalCtrl.create(RankThisWeekPage,{thisWeekPost:this.thisWeekPost.slice().reverse(),thisWeekPostIndex:'fit'+i,date:this.dateFinal2},{leaveAnimation:'back'});
    thisWeekModal.present();
  }




}
