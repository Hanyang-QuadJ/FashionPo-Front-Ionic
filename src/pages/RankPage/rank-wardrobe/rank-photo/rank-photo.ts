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


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public modalCtrl:ModalController) {
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
    console.log(yOffset);
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
  parsingDate(date) {
    let month;
    let year;
    let day;
    //m d, y
    year = date.substring(0,4);
    day = date.substring(8,10);
    if(date.substring(5,7)==='01'){
      month='Jan'
    }
    else if(date.substring(5,7)==='02'){
      month='Feb'
    }
    else if(date.substring(5,7)==='03'){
      month='Mar'
    }
    else if(date.substring(5,7)==='04'){
      month='Apr'
    }
    else if(date.substring(5,7)==='05'){
      month='May'
    }
    else if(date.substring(5,7)==='06'){
      month='Jun'
    }
    else if(date.substring(5,7)==='07'){
      month='Jul'
    }
    else if(date.substring(5,7)==='08'){
      month='Aug'
    }
    else if(date.substring(5,7)==='09'){
      month='Sep'
    }
    else if(date.substring(5,7)==='10'){
      month='Oct'
    }
    else if(date.substring(5,7)==='11'){
      month='Nov'
    }
    else if(date.substring(5,7)==='12'){
      month='Dec'
    }
    return month+" "+day+", "+year;
  }

}
