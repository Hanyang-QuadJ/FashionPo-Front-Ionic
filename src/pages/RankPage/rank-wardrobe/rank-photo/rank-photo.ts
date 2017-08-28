import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController, NavParams,Content,ViewController,ModalController } from 'ionic-angular';
import {TagPage} from "../../../tag/tag";

/**
 * Generated class for the RankPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-rank-photo',
  templateUrl: 'rank-photo.html',
})
export class RankPhotoPage {
  @ViewChild(Content) content: Content;
  postList:any="";
  postListIndex:any="";
  date:any="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public modalCtrl:ModalController) {
    this.postList = navParams.get('postList');
    this.postListIndex = navParams.get('postListIndex');
    this.date = this.navParams.get('date');
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
  goToTag(tagName,i){
    console.log(tagName);
    let tagModal = this.modalCtrl.create(TagPage, {tagName:tagName});
    tagModal.onDidDismiss((check)=> {
      let yOffset = document.getElementById('fit'+i).offsetTop;
      this.content.scrollTo(0, yOffset,0);
    });
    tagModal.present();

  }

}
