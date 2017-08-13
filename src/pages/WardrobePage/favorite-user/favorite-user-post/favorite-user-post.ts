import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController, NavParams,Content,ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
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
    console.log(yOffset)
    this.content.scrollTo(0,yOffset,0);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad FavoriteUserPostPage');
  }

}
