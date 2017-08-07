import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';

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
  favUser=""


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,    private storage : Storage,
              private http: Http
              ) {
  }

  ngOnInit(): void {
    this.favUser = this.navParams.get('favList');
    console.log(this.favUser);
    // this.storage.get('token').then((val) => {
    //   var APIUrl = '/myposts';
    //   // if (this.platform.is('ios') == true){
    //   //   APIUrl = 'http://54.162.160.91/api/rank';
    //   //   // console.log('yes');
    //   // }
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   headers.append('x-access-token', val);

    //   this.http.post(APIUrl, {headers: headers})
    //     .map(res => res.json())
    //     .subscribe(data => {
    //
    //     });
    // });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteUserPage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }

}
