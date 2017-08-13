import { Component,ViewChild,OnInit } from '@angular/core';
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
export class WardrobePhotoPage implements OnInit{
  @ViewChild(Content) content: Content;
  postList ="";
  postListIndex:string="";
  date:Array<any>=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log(navParams.get('postListIndex'));
    this.postList = navParams.get('postList');
    this.postListIndex = navParams.get('postListIndex');
    this.date = navParams.get('date');






  }

  ionViewWillEnter(){
    this.scrollToCard()
  }
  scrollToCard(){
    let yOffset = document.getElementById(this.postListIndex).offsetTop;
    console.log(yOffset)
    this.content.scrollTo(0,yOffset,0);
  }
  ngOnInit(): void {


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobePhotoPage');
    console.log(this.postList)




  }




  public dismiss(){
    this.viewCtrl.dismiss()
  }







}
