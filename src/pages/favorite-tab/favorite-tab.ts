import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {Storage} from '@ionic/storage';
/**
 * Generated class for the FavoriteTabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite-tab',
  templateUrl: 'favorite-tab.html',
})
export class FavoriteTabPage implements OnInit{
  favorites: Array<object> = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public http: Http) {
  }
  ngOnInit(): void {
    var APIUrl_1 = '/user';
    // if (this.platform.is('ios') == true){
    //   APIUrl = 'http://54.162.160.91/api/user';
    // }
    this.storage.get('token').then((val) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      // console.log(val);

      this.http.get(APIUrl_1 + '/favorite', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.favorites = data.favorites;
          console.log(this.favorites);
        });
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteTabPage');
  }

}
