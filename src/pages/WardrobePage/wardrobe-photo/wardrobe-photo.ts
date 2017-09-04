import {Component, ViewChild, OnInit} from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  Content,
  AlertController,
  Platform,
  ModalController
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {TagPage} from "../../tag/tag";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";

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
export class WardrobePhotoPage implements OnInit {
  @ViewChild(Content) content: Content;
  postList: any = "";
  postListIndex: any = null;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public alertCtrl: AlertController, public storage: Storage, public http: Http, public platform: Platform, public modalCtrl: ModalController,
              public fetchDatas: FetchDataProvider) {
    console.log(navParams.get('postListIndex'));
    this.postList = navParams.get('postList');
    this.postListIndex = navParams.get('postListIndex');


  }

  ionViewWillEnter() {
    this.scrollToCard()

  }

  parsingDate(date) {
    let month;
    let year;
    let day;
    //m d, y
    year = date.substring(0, 4);
    day = date.substring(8, 10);
    if (date.substring(5, 7) === '01') {
      month = 'Jan'
    }
    else if (date.substring(5, 7) === '02') {
      month = 'Feb'
    }
    else if (date.substring(5, 7) === '03') {
      month = 'Mar'
    }
    else if (date.substring(5, 7) === '04') {
      month = 'Apr'
    }
    else if (date.substring(5, 7) === '05') {
      month = 'May'
    }
    else if (date.substring(5, 7) === '06') {
      month = 'Jun'
    }
    else if (date.substring(5, 7) === '07') {
      month = 'Jul'
    }
    else if (date.substring(5, 7) === '08') {
      month = 'Aug'
    }
    else if (date.substring(5, 7) === '09') {
      month = 'Sep'
    }
    else if (date.substring(5, 7) === '10') {
      month = 'Oct'
    }
    else if (date.substring(5, 7) === '11') {
      month = 'Nov'
    }
    else if (date.substring(5, 7) === '12') {
      month = 'Dec'
    }
    return month + " " + day + ", " + year;
  }

  scrollToCard() {
    let yOffset = document.getElementById(this.postListIndex).offsetTop;
    console.log(yOffset);
    this.content.scrollTo(0, yOffset, 0);
  }

  ngOnInit(): void {


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobePhotoPage');
    console.log(this.postList);
    console.log(this.postList[this.postListIndex]._id);
    console.log(this.postList[this.postListIndex].writtenBy);


  }

  presentConfirm(i) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.fetchDatas.postData('/post/delete', {
              _id: this.postList[i]._id,
              writtenBy: this.postList[i].writtenBy
            }).then(data => {
              let check = "check";
              this.viewCtrl.dismiss(check);
            });
          }
        }
      ]
    });
    alert.present();
  }

  public dismiss() {
    this.viewCtrl.dismiss()
  }

  goToTag(tagName, i) {
    console.log(tagName);
    let tagModal = this.modalCtrl.create(TagPage, {tagName: tagName});
    tagModal.onDidDismiss(() => {
      let yOffset = document.getElementById(i).offsetTop;
      this.content.scrollTo(0, yOffset, 0);
    });
    tagModal.present();

  }
}
