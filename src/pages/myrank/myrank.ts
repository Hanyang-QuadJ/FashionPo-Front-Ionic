import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';

/**
 * Generated class for the MyrankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-myrank',
  templateUrl: 'myrank.html',
})

export class MyrankPage {
  mypost: string = "";
  username: string= "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private storage : Storage, private http: Http,
  public platform: Platform,) {
    var APIUrl = '/user';
    // if (this.platform.is('ios') == true){
    //   APIUrl = 'http://54.162.160.91/api/user';
    // }
    this.storage.get('token').then((val) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      // console.log(val);

      this.http.get(APIUrl+'/authed', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          console.log(data.user[0])
          this.mypost = data.user[0].my_posts[0]
          this.username = data.user[0].username
        });
    });
  }




  public dismiss() {
    this.viewCtrl.dismiss();
  }



}
