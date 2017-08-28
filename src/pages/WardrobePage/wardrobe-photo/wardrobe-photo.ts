import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController, NavParams,ViewController,Content,AlertController,Platform,ModalController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {TagPage} from "../../tag/tag";

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
  postList:any ="";
  postListIndex:any=null;
  date:Array<any>=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public alertCtrl: AlertController, public storage: Storage, public http: Http, public platform: Platform,public modalCtrl:ModalController, ) {
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
    console.log(yOffset);
    this.content.scrollTo(0,yOffset,0);
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
            this.storage.get('token').then((val) => {
              var APIUrl = '/post/delete';


              if (this.platform.is('ios') == true){
                APIUrl = 'http://54.162.160.91/api/post/delete';

              }

              let headers = new Headers();
              headers.append('Content-Type', 'application/json');
              headers.append('x-access-token', val);
              const body = {_id: this.postList[i]._id,
                writtenBy:this.postList[i].writtenBy

              };

              this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                .map(res => res.json())
                .subscribe(
                  data => {
                    console.log('deleted');
                    let check = "check";
                    this.viewCtrl.dismiss(check);


                  });
            });


            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }
  goToTag(tagName,i){
    console.log(tagName);
    let tagModal = this.modalCtrl.create(TagPage, {tagName:tagName});
    tagModal.onDidDismiss(()=> {
      let yOffset = document.getElementById(i).offsetTop;
      this.content.scrollTo(0, yOffset,0);
    });
    tagModal.present();

  }
}
