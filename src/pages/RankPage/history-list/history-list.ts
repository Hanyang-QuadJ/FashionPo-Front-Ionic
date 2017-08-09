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
  date:Array<string>=[];
  dateFinal:Array<object>=[];
  year:Array<any>=[];
  startDay:Array<any>=[];
  endDay:Array<any>=[];
  month:Array<any>=[];
  rankList:Array<object>=[];
  ranksheet:Array<object>=[];


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private storage: Storage, public modalCtrl:ModalController,
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
          this.rankList = data.ranks;
          for(var i = 0; i<this.rankList.length; i++){
            this.date.push(data.ranks[i].createdAt)
          }

          for(var j = 0; j<this.rankList.length; j++){
            this.ranksheet.push(data.ranks[j].rankSheet)
          }
          for(var h = 0; h<this.date.length; h++){
            this.year.push(this.date[h].substring(0,4));
            this.startDay.push(Number(this.date[h].substring(8,10))-6);
            this.endDay.push(Number(this.date[h].substring(8,10)));
            if(this.date[h].substring(5,7)==='01'){
              this.month.push('Jan')
            }
            else if(this.date[h].substring(5,7)==='02'){
              this.month.push('Feb')
            }
            else if(this.date[h].substring(5,7)==='03'){
              this.month.push('Mar')
            }
            else if(this.date[h].substring(5,7)==='04'){
              this.month.push('Apr')
            }
            else if(this.date[h].substring(5,7)==='05'){
              this.month.push('May')
            }
            else if(this.date[h].substring(5,7)==='06'){
              this.month.push('Jun')
            }
            else if(this.date[h].substring(5,7)==='07'){
              this.month.push('Jul')
            }
            else if(this.date[h].substring(5,7)==='08'){
              this.month.push('Aug')
            }
            else if(this.date[h].substring(5,7)==='09'){
              this.month.push('Sep')
            }
            else if(this.date[h].substring(5,7)==='10'){
              this.month.push('Oct')
            }
            else if(this.date[h].substring(5,7)==='11'){
              this.month.push('Nov')
            }
            else if(this.date[h].substring(5,7)==='12'){
              this.month.push('Dec')
            }
            this.dateFinal.push({'sDay':this.startDay[h],'eDay':this.endDay[h],'mon':this.month[h],'yr':this.year[h]})
          }

          console.log("&&&&&&&&&")
          console.log(this.date)
          console.log(this.year);
          console.log(this.month);
          console.log(this.startDay);
          console.log(this.endDay);
          console.log(this.dateFinal);

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
    let historyRankModal = this.modalCtrl.create(HistoryRankPage, { rankSheet:this.ranksheet[i],week:this.dateFinal[i]},{leaveAnimation:'back'});
    historyRankModal.present();

  }

}
