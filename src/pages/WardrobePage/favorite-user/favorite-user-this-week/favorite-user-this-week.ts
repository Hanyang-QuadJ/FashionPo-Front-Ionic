import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,Content } from 'ionic-angular';

/**
 * Generated class for the FavoriteUserThisWeekPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite-user-this-week',
  templateUrl: 'favorite-user-this-week.html',
})
export class FavoriteUserThisWeekPage {
  @ViewChild(Content) content: Content;
  postList:"";
  postListIndex:"";
  date:"";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.postList = this.navParams.get('thisWeekPost');
    this.postListIndex = this.navParams.get('thisWeekPostIndex');
    this.date = this.navParams.get('date');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteUserThisWeekPage');
  }

  ionViewWillEnter(){
    this.scrollToCard()

  }
  scrollToCard(){
    let yOffset = document.getElementById(this.postListIndex).offsetTop;
    console.log(yOffset)
    this.content.scrollTo(0,yOffset,0);
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }

}
