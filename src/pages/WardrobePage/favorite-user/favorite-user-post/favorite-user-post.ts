import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController, NavParams,Content,ViewController, ModalController } from 'ionic-angular';
import {TagPage} from "../../../tag/tag";

/**
 * Generated class for the FavoriteUserPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite-user-post',
  templateUrl: 'favorite-user-post.html',
})
export class FavoriteUserPostPage implements OnInit{
  @ViewChild(Content) content: Content;
  postList ="";
  postListIndex:string="";
  date="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public modalCtrl:ModalController) {
    this.postList = navParams.get('postList');
    this.postListIndex = navParams.get('postListIndex');
    this.date = this.navParams.get('date');
  }
  ngOnInit(): void {


  }

  ionViewWillEnter(){
    this.scrollToCard()
  }

  public dismiss(){
    this.viewCtrl.dismiss()
  }

  scrollToCard(){
    let yOffset = document.getElementById(this.postListIndex).offsetTop;
    console.log(yOffset);
    this.content.scrollTo(0,yOffset,0);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad FavoriteUserPostPage');
  }

  goToTag(tagName,i){
    console.log(tagName);
    let tagModal = this.modalCtrl.create(TagPage, {tagName:tagName});
    tagModal.onDidDismiss(()=> {
      let yOffset = document.getElementById('fit'+i).offsetTop;
      this.content.scrollTo(0, yOffset,0);
    });
    tagModal.present();

  }

}
