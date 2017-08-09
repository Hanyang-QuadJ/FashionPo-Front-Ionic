import { Component } from '@angular/core';
import { NavController, NavParams,ViewController, } from 'ionic-angular';

/**
 * Generated class for the HistoryRankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-history-rank',
  templateUrl: 'history-rank.html',
})
export class HistoryRankPage {
  rankSheet:Array<any>=[];
  date:Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.rankSheet = navParams.get('rankSheet');
    this.date = navParams.get('week')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryRankPage');
    console.log(this.rankSheet)
  }
  pop(){
    this.viewCtrl.dismiss();

  }

}
