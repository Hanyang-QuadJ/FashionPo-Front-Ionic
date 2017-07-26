import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {TabsPage} from "../tabs/tabs";
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  user: object = {};
  option: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: Http) {
    this.option = "view";
    this.storage.get('token').then((val) => {
      let headers = new Headers();
      headers.append('Content-Type', 'text/plain');
      headers.append('x-access-token', val);
      // console.log(val);

      this.http.get('/user/authed', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.user = data.user[0];
        });
    });
  }
}



