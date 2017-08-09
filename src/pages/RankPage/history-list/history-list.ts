import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ViewController,ModalController, } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HistoryRankPage} from '../history-rank/history-rank';

/**
 * Generated class for the HistoryListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-history-list',
  templateUrl: 'history-list.html',
})
export class HistoryListPage implements OnInit{
  date:Array<object>=[];
  ranksheet:Array<object>=[];


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private storage: Storage, public modalCtrl:ModalController,
              private http: Http) {
  }

  ngOnInit(): void {

    this.ranksheet
    this.storage.get('token').then((val) => {
      var APIUrl = '/rank/save';
      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://54.162.160.91/api/rank';
      //   // console.log('yes');
      // }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);

      this.http.get(APIUrl,{headers: headers})
        .map(res => res.json())

        .subscribe(data => {

          this.date = data.ranks;
          for(var i = 0; i<this.date.length; i++){
            this.ranksheet.push(data.ranks[i].rankSheet)
          }
          console.log("&&&&&&&&&")
          console.log(this.ranksheet)

        });
    });





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryListPage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }
  goToPage(i){
    let historyRankModal = this.modalCtrl.create(HistoryRankPage, { rankSheet:this.ranksheet[i]},{leaveAnimation:'back'});
    historyRankModal.present();

  }

}
