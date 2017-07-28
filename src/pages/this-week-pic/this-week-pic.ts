import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the ThisWeekPicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-this-week-pic',
  templateUrl: 'this-week-pic.html',
})
export class ThisWeekPicPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThisWeekPicPage');
  }
  public dismiss() {
    this.viewCtrl.dismiss();
  }

}
