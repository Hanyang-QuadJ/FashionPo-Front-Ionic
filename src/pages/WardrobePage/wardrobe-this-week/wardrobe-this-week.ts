import { Component,OnInit,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,Content,AlertController,Platform } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

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
  postList:any="";
  postListIndex:any="";
  date="";
  yOffset:any="";



  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  public alertCtrl: AlertController, public storage : Storage, public http: Http, public platform: Platform) {




  }

  ngOnInit(): void {
    this.postList = this.navParams.get('thisWeekPost')
    this.postListIndex = this.navParams.get('thisWeekPostIndex')
    this.date = this.navParams.get('date')



  }

  ionViewWillEnter(){
    this.yOffset = document.getElementById(this.postListIndex).offsetTop;
    this.content.scrollTo(0,this.yOffset,0);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobeThisWeekPage');

  }

  public dismiss(){
    let renewedData="notRenewed";
    this.viewCtrl.dismiss(renewedData)
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
                    let renewedData = 'renewed';
                    this.viewCtrl.dismiss(renewedData)
                  });
            });


            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
