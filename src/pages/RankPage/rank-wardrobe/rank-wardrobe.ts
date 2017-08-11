import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';

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
  user:any="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private http: Http, private storage:Storage) {
    this.ranks = this.navParams.get('ranks')
    console.log(this.ranks)
    this.storage.get('token').then((val) => {
      var APIUrl = '/user';

      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://54.162.160.91/api/user';
      //   APIUrl_2 = 'http://54.162.160.91/api/post';
      // }

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      const body = {users: [this.ranks.writtenBy]}

      this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {
            this.user = data
          });


      this.http.post(APIUrl,JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {


        });



    });
  }







  ionViewDidLoad() {
    console.log('ionViewDidLoad RankWardrobePage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }



}
