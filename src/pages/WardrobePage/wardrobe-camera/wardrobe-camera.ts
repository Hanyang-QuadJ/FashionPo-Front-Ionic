import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the WardrobeCameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-wardrobe-camera',
  templateUrl: 'wardrobe-camera.html',
})
export class WardrobeCameraPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobeCameraPage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }

}
