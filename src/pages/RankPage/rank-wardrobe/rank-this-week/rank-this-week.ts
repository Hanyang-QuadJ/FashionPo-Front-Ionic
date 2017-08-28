import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,Content,ModalController } from 'ionic-angular';
import {FavoriteUserPage} from "../../../WardrobePage/favorite-user/favorite-user";
import {TagPage} from "../../../tag/tag";

/**
 * Generated class for the FavoriteUserThisWeekPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-rank-this-week',
  templateUrl: 'rank-this-week.html',
})

export class RankThisWeekPage {
  @ViewChild(Content) content: Content;
  thisWeekPost:"";
  thisWeekPostIndex:"";
  date:any="";
  tagPageCheck:any="";
  users:any="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController,) {
    this.thisWeekPost = this.navParams.get('thisWeekPost');
    this.thisWeekPostIndex = this.navParams.get('thisWeekPostIndex');
    this.date = this.navParams.get('date');
    this.tagPageCheck = this.navParams.get('pageCheck');
    this.users = this.navParams.get('user');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteUserThisWeekPage');
  }

  ionViewWillEnter(){
    this.scrollToCard()


  }
  scrollToCard(){
    let yOffset = document.getElementById(this.thisWeekPostIndex).offsetTop;

    this.content.scrollTo(0,yOffset,0);
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }
  presentWardrobe(i){
    console.log(this.users[i]._id);
    let wardrobeModal = this.modalCtrl.create(FavoriteUserPage,{favList:this.users[i]});
    wardrobeModal.present();
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

