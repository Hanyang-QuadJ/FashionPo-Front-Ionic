import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  ranks: Array<object> = [];
  picURL: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage : Storage, private http: Http, public platform: Platform) {
    this.storage.get('token').then((val) => {
      var APIUrl = '/rank';
      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://54.162.160.91/api/rank';
      //   // console.log('yes');
      // }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);


      this.http.get(APIUrl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // for(var i=0;i<data.posts.length;i++) {
          //   this.ranks[i] = data.posts[i];
          // }
          console.log(data.posts[0].picURL);
          this.picURL = data.posts[0].picURL;
        });
    });
  }
  // ionViewWillEnter() {
  //   this.storage.get('token').then((val) => {
  //     let headers = new Headers();
  //     headers.append('Content-Type', 'text/plain');
  //     headers.append('x-access-token', val);
  //     // console.log(val);
  //
  //     this.http.get('/rank', {headers: headers})
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         for(var i=0;i<data.posts.length;i++) {
  //           this.ranks[i] = data.posts[i];
  //         }
  //       });
  //   });
  // }
}
