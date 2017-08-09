import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private storage: Storage,
              private http: Http) {
  }

  ngOnInit(): void {
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
          console.log("&&&&&&&&&")
          console.log(this.date)
        });
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryListPage');
  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }
  goToPage(){
    this.navCtrl.push(HistoryRankPage)
  }

}
