import { Component,ViewChild, } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,ViewController, ModalController } from 'ionic-angular';
import {FavoriteUserPage} from "../../WardrobePage/favorite-user/favorite-user";
import {TagPage} from "../../tag/tag";

/**
 * Generated class for the TagListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tag-list',
  templateUrl: 'tag-list.html',
})
export class TagListPage {
  @ViewChild(Content) content: Content;
  thisWeekPost:any;
  selectedPost:any;
  thisWeekPostIndex:"";
  date:any="";
  tagPageCheck:any="";
  users:any="";
  like:boolean;
  order: string = 'likeCnt';
  orderDate: string = 'writtenAt';

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.thisWeekPost = this.navParams.get('thisWeekPost');
    this.thisWeekPostIndex = this.navParams.get('thisWeekPostIndex');
    this.tagPageCheck = this.navParams.get('pageCheck');
    this.users = this.navParams.get('user');
    this.like = this.navParams.get('like');
    this.like = false;
    if(this.navParams.get('like')==='like'){
      this.like = true;
    }
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
    // console.log(this.users[i]._id);
    let wardrobeModal = this.modalCtrl.create(FavoriteUserPage,{favList:this.users[i]});
    wardrobeModal.present();
  }
  goToTag(tagName,i){
    // console.log(tagName);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagListPage');
  }

}
