import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage) {

  }

  userLogin() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      email : this.login.email,
      password : this.login.password
    };
    this.http.post('/auth/login', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.storage.set('token', data.token);
        this.navCtrl.push(TabsPage);
      });
  }

}
