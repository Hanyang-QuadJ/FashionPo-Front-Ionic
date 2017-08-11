import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,Content } from 'ionic-angular';

/**
 * Generated class for the FavoriteUserThisWeekPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-vote-this-week',
  templateUrl: 'vote-this-week.html',
})
export class VoteThisWeekPage {
  @ViewChild(Content) content: Content;
  thisWeekPost:"";
  thisWeekPostIndex:"";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.thisWeekPost = this.navParams.get('thisWeekPost');
    this.thisWeekPostIndex = this.navParams.get('thisWeekPostIndex');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteUserThisWeekPage');
  }

  ionViewWillEnter(){
    this.scrollToCard()

  }
  scrollToCard(){
    let yOffset = document.getElementById(this.thisWeekPostIndex).offsetTop;
    console.log(yOffset)
    this.content.scrollTo(0,yOffset,0);
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }

}


