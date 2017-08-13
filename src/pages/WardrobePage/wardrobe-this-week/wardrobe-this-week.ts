import { Component,OnInit,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,Content } from 'ionic-angular';

/**
 * Generated class for the WardrobeThisWeekPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-wardrobe-this-week',
  templateUrl: 'wardrobe-this-week.html',
})
export class WardrobeThisWeekPage implements OnInit{
  @ViewChild(Content) content: Content;
  postList="";
  postListIndex="";
  date="";



  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.postList = this.navParams.get('thisWeekPost')
    this.postListIndex = this.navParams.get('thisWeekPostIndex')
    this.date = this.navParams.get('date')

  }

  ngOnInit(): void {



  }

  ionViewWillEnter(){
    this.scrollToCard()

  }
  scrollToCard(){
    let yOffset = document.getElementById(this.postListIndex).offsetTop;
    console.log(yOffset)
    this.content.scrollTo(0,yOffset,0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobeThisWeekPage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }

}
