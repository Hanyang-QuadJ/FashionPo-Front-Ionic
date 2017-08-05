import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the WardrobePhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-wardrobe-photo',
  templateUrl: 'wardrobe-photo.html',
})
export class WardrobePhotoPage {
  postList =""

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log(navParams.get('postList'));
    this.postList = navParams.get('postList')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobePhotoPage');
  }

  public dismiss(){
    this.viewCtrl.dismiss()
  }

}
