import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {TabsPage} from "../tabs/tabs";
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  login = {
    email: '',
    password: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage, public platform: Platform) {

  }

  userLogin() {
    var APIUrl = '/auth';
    // if (this.platform.is('ios') == true){
    //   APIUrl = 'http://54.162.160.91/api/auth';
    //   // console.log('yes');
    // }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      email : this.login.email,
      password : this.login.password
    };
    this.http.post(APIUrl + "/login", JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.storage.set('token', data.token);
        this.navCtrl.push(TabsPage);
      });
  }

}
