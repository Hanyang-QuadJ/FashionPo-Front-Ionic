import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

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
  tagPics:Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
              private storage:Storage, public http: Http) {
    this.tagName = this.navParams.get('tagName');
    this.storage.get('token').then((val) => {
      var APIUrl = '/post/tag';

      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/post/tag';
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
            console.log(data);
            this.tagPics = data;

          });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagPage');
  }
  public dismiss(){
    this.viewCtrl.dismiss();
  }

}
