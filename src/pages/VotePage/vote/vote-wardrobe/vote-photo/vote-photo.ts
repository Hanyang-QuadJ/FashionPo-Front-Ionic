import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController, NavParams,Content,ViewController } from 'ionic-angular';

/**
 * Generated class for the RankPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-vote-photo',
  templateUrl: 'vote-photo.html',
})
export class VotePhotoPage {
  @ViewChild(Content) content: Content;
  postList:any="";
  postListIndex:any="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.postList = navParams.get('postList');
    this.postListIndex = navParams.get('postListIndex');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankPhotoPage');
  }

  ionViewWillEnter(){
    this.scrollToCard()
  }

  public dismiss(){
    this.viewCtrl.dismiss()
  }

  scrollToCard(){
    let yOffset = document.getElementById(this.postListIndex).offsetTop;
    console.log(yOffset)
    this.content.scrollTo(0,yOffset,0);
  }

}

