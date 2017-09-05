import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TagPage} from "../tag/tag";
import {TabsPage} from "../tabs/tabs";
import {FetchDataProvider} from "../../providers/fetch-data/fetch-data";

/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public fetchDatas: FetchDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }
  goToTab(){
    this.fetchDatas.getData('/user/tutorial').then(data=>{
      console.log(data)
    });
    this.navCtrl.setRoot(TabsPage);
  }

}
