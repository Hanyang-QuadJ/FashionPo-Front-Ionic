import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,Content } from 'ionic-angular';

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
  @ViewChild(Content) content: Content;
  postList ="";
  postListIndex:string="";


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log(navParams.get('postListIndex'));
    this.postList = navParams.get('postList');
    this.postListIndex = navParams.get('postListIndex');
    this.scrollToCard();


  }







  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobePhotoPage');

//   scrollTo(this.postListIndex){
//   let yOffset = document.getElementById(this.postListIndex).offsetTop;
//   this.content.scrollTo(0, yOffset, 4000)
  }




  public dismiss(){
    this.viewCtrl.dismiss()
  }

  scrollToCard(){
    let yOffset = document.getElementById(this.postListIndex).offsetTop;
    this.content.scrollTo(0, yOffset, 3000);
  }





}
