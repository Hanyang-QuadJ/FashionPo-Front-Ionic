import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlaygroundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-playground',
  templateUrl: 'playground.html',
})
export class PlaygroundPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaygroundPage');

  }
  ionViewWillEnter() {

    console.log('reload PlaygroundPage');
  }

}
