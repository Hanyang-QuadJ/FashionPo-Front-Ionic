import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, Platform, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HomePage} from '../../RankPage/home/home';
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import {ImageLoader} from "ionic-image-loader";

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
export class HistoryListPage implements OnInit {
	date: Array<string> = [];
	dateFinal: Array<object> = [];
	year: Array<any> = [];
	startDay: Array<any> = [];
	historyNew: boolean;
	endDay: Array<any> = [];
	month: Array<any> = [];
	endMonth: Array<any> = [];
	rankList: Array<object> = [];
	ranksheet: Array<object> = [];
	testArray: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	ranksheetLength: any;
	isRank: boolean;
	callback:any;
	renewed:any;


	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private storage: Storage, public modalCtrl: ModalController,
	            private http: Http, public platform: Platform, public loadingCtrl: LoadingController,public imgLoader:ImageLoader,
	            public fetchDatas: FetchDataProvider) {
		this.getHistoryNew();
		this.callback = this.navParams.get("callback");


	}

	public getHistoryNew() {
		this.fetchDatas.getData('/user/authed').then(data => {
			// // console.log(data.user[0].isHistoryNew);
			if (data.user[0].isHistoryNew === true) {
				this.historyNew = true;
			}
			else {
				this.historyNew = false;
			}
		})
	}

	ngOnInit(): void {
		this.isRank = false;
		let loading = this.loadingCtrl.create({
			showBackdrop: true,
			cssClass: 'loading',
			spinner: 'crescent',
			enableBackdropDismiss: true
		});
		loading.present();
		this.fetchDatas.getData('/rank/save').then(data => {
			if (data.ranks === [] || data.ranks.length === 0) {
				this.isRank = true;
				loading.dismiss();
			}
			else {
				// // console.log(data.ranks);

				this.rankList = data.ranks;

				for (var i = 0; i < this.rankList.length; i++) {
					this.date.push(data.ranks[i].createdAt)
				}

				for (var j = 0; j < this.rankList.length; j++) {
					this.ranksheet.push(data.ranks[j].rankSheet)
				}
				console.log(this.ranksheet);


				this.ranksheetLength = this.ranksheet.length;
				// // console.log(this.ranksheet);


				for (var h = 0; h < this.date.length; h++) {
					this.year.push(this.date[h].substring(0, 4));
					var monthCheck = this.date[h].substring(5, 7)
					if (Number(this.date[h].substring(8, 10)) === 6) {
						if (monthCheck === '04' || monthCheck === '06' || monthCheck === '09' || monthCheck === '11' || monthCheck === '01' || monthCheck === '08' || monthCheck === '02') {
							this.startDay.push(31)
							if (this.date[h].substring(5, 7) === '04') {
								this.month.push('Mar')
								this.endMonth.push('Apr')
							}
							else if (this.date[h].substring(5, 7) === '06') {
								this.month.push('May')
								this.endMonth.push('Jun')
							}
							else if (this.date[h].substring(5, 7) === '09') {
								this.month.push('Aug')
								this.endMonth.push('Sep')
							}
							else if (this.date[h].substring(5, 7) === '11') {
								this.month.push('Oct')
								this.endMonth.push('Nov')
							}
							else if (this.date[h].substring(5, 7) === '01') {
								this.month.push('Dec')
								this.endMonth.push('Jan')
							}
							else if (this.date[h].substring(5, 7) === '02') {
								this.month.push('Jan')
								this.endMonth.push('Feb')
							}
							else if (this.date[h].substring(5, 7) === '08') {
								this.month.push('Jul')
								this.endMonth.push('Aug')
							}

						}
						else if (monthCheck === '03') {
							this.startDay.push(28);
							this.month.push('Feb');
							this.endMonth.push('Mar')
						}
						else {
							this.startDay.push(30);
							if (this.date[h].substring(5, 7) === '05') {
								this.month.push('Apr')
								this.endMonth.push('May')
							}
							else if (this.date[h].substring(5, 7) === '07') {
								this.month.push('Jun')
								this.endMonth.push('Jul')
							}
							else if (this.date[h].substring(5, 7) === '10') {
								this.month.push('Sep')
								this.endMonth.push('Oct')
							}
						}

					}
					else if (Number(this.date[h].substring(8, 10)) === 5) {
						if (monthCheck === '04' || monthCheck === '06' || monthCheck === '09' || monthCheck === '11' || monthCheck === '01' || monthCheck === '08' || monthCheck === '02') {
							this.startDay.push(30)
							if (this.date[h].substring(5, 7) === '04') {
								this.month.push('Mar')
								this.endMonth.push('Apr')
							}
							else if (this.date[h].substring(5, 7) === '06') {
								this.month.push('May')
								this.endMonth.push('Jun')
							}
							else if (this.date[h].substring(5, 7) === '09') {
								this.month.push('Aug')
								this.endMonth.push('Sep')
							}
							else if (this.date[h].substring(5, 7) === '11') {
								this.month.push('Oct')
								this.endMonth.push('Nov')
							}
							else if (this.date[h].substring(5, 7) === '01') {
								this.month.push('Dec')
								this.endMonth.push('Jan')
							}
							else if (this.date[h].substring(5, 7) === '02') {
								this.month.push('Jan')
								this.endMonth.push('Feb')
							}
							else if (this.date[h].substring(5, 7) === '08') {
								this.month.push('Jul')
								this.endMonth.push('Aug')
							}

						}
						else if (monthCheck === '03') {
							this.startDay.push(27)
							this.month.push('Feb')
							this.endMonth.push('Mar')
						}
						else {
							this.startDay.push(29);
							if (this.date[h].substring(5, 7) === '05') {
								this.month.push('Apr')
								this.endMonth.push('May')
							}
							else if (this.date[h].substring(5, 7) === '07') {
								this.month.push('Jun')
								this.endMonth.push('Jul')
							}
							else if (this.date[h].substring(5, 7) === '10') {
								this.month.push('Sep')
								this.endMonth.push('Oct')
							}
						}


					}
					else if (Number(this.date[h].substring(8, 10)) === 4) {
						if (monthCheck === '04' || monthCheck === '06' || monthCheck === '09' || monthCheck === '11' || monthCheck === '01' || monthCheck === '08' || monthCheck === '02') {
							this.startDay.push(29)
							if (this.date[h].substring(5, 7) === '04') {
								this.month.push('Mar')
								this.endMonth.push('Apr')
							}
							else if (this.date[h].substring(5, 7) === '06') {
								this.month.push('May')
								this.endMonth.push('Jun')
							}
							else if (this.date[h].substring(5, 7) === '09') {
								this.month.push('Aug')
								this.endMonth.push('Sep')
							}
							else if (this.date[h].substring(5, 7) === '11') {
								this.month.push('Oct')
								this.endMonth.push('Nov')
							}
							else if (this.date[h].substring(5, 7) === '01') {
								this.month.push('Dec')
								this.endMonth.push('Jan')
							}
							else if (this.date[h].substring(5, 7) === '02') {
								this.month.push('Jan')
								this.endMonth.push('Feb')
							}
							else if (this.date[h].substring(5, 7) === '08') {
								this.month.push('Jul')
								this.endMonth.push('Aug')
							}

						}
						else if (monthCheck === '03') {
							this.startDay.push(26)
							this.month.push('Feb')
							this.endMonth.push('Mar')
						}
						else {
							this.startDay.push(28);
							if (this.date[h].substring(5, 7) === '05') {
								this.month.push('Apr')
								this.endMonth.push('May')
							}
							else if (this.date[h].substring(5, 7) === '07') {
								this.month.push('Jun')
								this.endMonth.push('Jul')
							}
							else if (this.date[h].substring(5, 7) === '10') {
								this.month.push('Sep')
								this.endMonth.push('Oct')
							}
						}


					}
					else if (Number(this.date[h].substring(8, 10)) === 3) {
						if (monthCheck === '04' || monthCheck === '06' || monthCheck === '09' || monthCheck === '11' || monthCheck === '01' || monthCheck === '08' || monthCheck === '02') {
							this.startDay.push(28)
							if (this.date[h].substring(5, 7) === '04') {
								this.month.push('Mar')
								this.endMonth.push('Apr')
							}
							else if (this.date[h].substring(5, 7) === '06') {
								this.month.push('May')
								this.endMonth.push('Jun')
							}
							else if (this.date[h].substring(5, 7) === '09') {
								this.month.push('Aug')
								this.endMonth.push('Sep')
							}
							else if (this.date[h].substring(5, 7) === '11') {
								this.month.push('Oct')
								this.endMonth.push('Nov')
							}
							else if (this.date[h].substring(5, 7) === '01') {
								this.month.push('Dec')
								this.endMonth.push('Jan')
							}
							else if (this.date[h].substring(5, 7) === '02') {
								this.month.push('Jan')
								this.endMonth.push('Feb')
							}
							else if (this.date[h].substring(5, 7) === '08') {
								this.month.push('Jul')
								this.endMonth.push('Aug')
							}

						}
						else if (monthCheck === '03') {
							this.startDay.push(25)
							this.month.push('Feb')
							this.endMonth.push('Mar')
						}
						else {
							this.startDay.push(27);
							if (this.date[h].substring(5, 7) === '05') {
								this.month.push('Apr')
								this.endMonth.push('May')
							}
							else if (this.date[h].substring(5, 7) === '07') {
								this.month.push('Jun')
								this.endMonth.push('Jul')
							}
							else if (this.date[h].substring(5, 7) === '10') {
								this.month.push('Sep')
								this.endMonth.push('Oct')
							}
						}


					}
					else if (Number(this.date[h].substring(8, 10)) === 2) {
						if (monthCheck === '04' || monthCheck === '06' || monthCheck === '09' || monthCheck === '11' || monthCheck === '01' || monthCheck === '08' || monthCheck === '02') {
							this.startDay.push(27)
							if (this.date[h].substring(5, 7) === '04') {
								this.month.push('Mar')
								this.endMonth.push('Apr')
							}
							else if (this.date[h].substring(5, 7) === '06') {
								this.month.push('May')
								this.endMonth.push('Jun')
							}
							else if (this.date[h].substring(5, 7) === '09') {
								this.month.push('Aug')
								this.endMonth.push('Sep')
							}
							else if (this.date[h].substring(5, 7) === '11') {
								this.month.push('Oct')
								this.endMonth.push('Nov')
							}
							else if (this.date[h].substring(5, 7) === '01') {
								this.month.push('Dec')
								this.endMonth.push('Jan')
							}
							else if (this.date[h].substring(5, 7) === '02') {
								this.month.push('Jan')
								this.endMonth.push('Feb')
							}
							else if (this.date[h].substring(5, 7) === '08') {
								this.month.push('Jul')
								this.endMonth.push('Aug')
							}

						}
						else if (monthCheck === '03') {
							this.startDay.push(24)
							this.month.push('Feb')
							this.endMonth.push('Mar')
						}
						else {
							this.startDay.push(26);
							if (this.date[h].substring(5, 7) === '05') {
								this.month.push('Apr')
								this.endMonth.push('May')
							}
							else if (this.date[h].substring(5, 7) === '07') {
								this.month.push('Jun')
								this.endMonth.push('Jul')
							}
							else if (this.date[h].substring(5, 7) === '10') {
								this.month.push('Sep')
								this.endMonth.push('Oct')
							}
						}


					}
					else if (Number(this.date[h].substring(8, 10)) === 1) {
						if (monthCheck === '04' || monthCheck === '06' || monthCheck === '09' || monthCheck === '11' || monthCheck === '01' || monthCheck === '08' || monthCheck === '02') {
							this.startDay.push(26)
							if (this.date[h].substring(5, 7) === '04') {
								this.month.push('Mar')
								this.endMonth.push('Apr')
							}
							else if (this.date[h].substring(5, 7) === '06') {
								this.month.push('May')
								this.endMonth.push('Jun')
							}
							else if (this.date[h].substring(5, 7) === '09') {
								this.month.push('Aug')
								this.endMonth.push('Sep')
							}
							else if (this.date[h].substring(5, 7) === '11') {
								this.month.push('Oct')
								this.endMonth.push('Nov')
							}
							else if (this.date[h].substring(5, 7) === '01') {
								this.month.push('Dec')
								this.endMonth.push('Jan')
							}
							else if (this.date[h].substring(5, 7) === '02') {
								this.month.push('Jan')
								this.endMonth.push('Feb')
							}
							else if (this.date[h].substring(5, 7) === '08') {
								this.month.push('Jul')
								this.endMonth.push('Aug')
							}

						}
						else if (monthCheck === '03') {
							this.startDay.push(23)
							this.month.push('Feb')
							this.endMonth.push('Mar')
						}
						else {
							this.startDay.push(25);
							if (this.date[h].substring(5, 7) === '05') {
								this.month.push('Apr')
								this.endMonth.push('May')
							}
							else if (this.date[h].substring(5, 7) === '07') {
								this.month.push('Jun')
								this.endMonth.push('Jul')
							}
							else if (this.date[h].substring(5, 7) === '10') {
								this.month.push('Sep')
								this.endMonth.push('Oct')
							}
						}


					}
					else if (Number(this.date[h].substring(8, 10)) > 6) {
						this.startDay.push(Number(this.date[h].substring(8, 10)) - 6);
						if (this.date[h].substring(5, 7) === '01') {
							this.month.push('Jan')
							this.endMonth.push('Jan')
						}
						else if (this.date[h].substring(5, 7) === '02') {
							this.month.push('Feb')
							this.endMonth.push('Feb')
						}
						else if (this.date[h].substring(5, 7) === '03') {
							this.month.push('Mar')
							this.endMonth.push('Mar')
						}
						else if (this.date[h].substring(5, 7) === '04') {
							this.month.push('Apr')
							this.endMonth.push('Apr')
						}
						else if (this.date[h].substring(5, 7) === '05') {
							this.month.push('May')
							this.endMonth.push('May')
						}
						else if (this.date[h].substring(5, 7) === '06') {
							this.month.push('Jun')
							this.endMonth.push('Jun')
						}
						else if (this.date[h].substring(5, 7) === '07') {
							this.month.push('Jul')
							this.endMonth.push('Jul')
						}
						else if (this.date[h].substring(5, 7) === '08') {
							this.month.push('Aug')
							this.endMonth.push('Aug')
						}
						else if (this.date[h].substring(5, 7) === '09') {
							this.month.push('Sep')
							this.endMonth.push('Sep')
						}
						else if (this.date[h].substring(5, 7) === '10') {
							this.month.push('Oct')
							this.endMonth.push('Oct')
						}
						else if (this.date[h].substring(5, 7) === '11') {
							this.month.push('Nov')
							this.endMonth.push('Nov')
						}
						else if (this.date[h].substring(5, 7) === '12') {
							this.month.push('Dec');
							this.endMonth.push('Dec')
						}

					}

					//음수예외처리 끝

					this.endDay.push(Number(this.date[h].substring(8, 10)));

					this.dateFinal.push({
						'sDay': this.startDay[h],
						'eDay': this.endDay[h],
						'mon': this.month[h],
						'yr': this.year[h],
						'endMon': this.endMonth[h]
					})
				}
				loading.dismiss();

			}

			// // console.log(this.dateFinal);


		});


	}
	ionViewWillEnter(){
		this.getHistoryNew();
	}

	ionViewDidLoad() {
		// // console.log('ionViewDidLoad HistoryListPage');


	}

	public dismiss() {
		this.viewCtrl.dismiss()
	}
	myCallbackFunction = (_params,_params2) => {
		return new Promise((resolve, reject) => {
			this.renewed = _params;

			resolve();
		});
	};

	goToPageWithDismiss(i) {
		if (this.historyNew === true) {
			this.navCtrl.push(HomePage, {
				rankSheet: this.ranksheet[i],
				rankDate: this.dateFinal[i],
				dismiss: 'dismiss',
				callback:this.myCallbackFunction.bind(this)
			});

		}
		else {
			this.navCtrl.push(HomePage, {
				rankSheet: this.ranksheet[i],
				rankDate: this.dateFinal[i],
			});
		}


	}

	goToPage(i) {
		this.navCtrl.push(HomePage, {
			rankSheet: this.ranksheet.slice().reverse()[i],
			rankDate: this.dateFinal.slice().reverse()[i]
		});
	}

}
