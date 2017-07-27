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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private storage : Storage, private http: Http,
  public platform: Platform,) {


  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }



}
