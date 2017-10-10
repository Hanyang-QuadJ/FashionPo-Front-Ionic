import {Component, OnInit, ViewChild} from '@angular/core';
import {
	NavController, NavParams, ViewController, Content, AlertController, Platform, ModalController,
	LoadingController
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {TagPage} from "../../tag/tag";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import {ImageLoader} from "ionic-image-loader";

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
export class WardrobeThisWeekPage implements OnInit {
	@ViewChild(Content) content: Content;
	postList: any = "";
	postListIndex: any = "";
	date = "";
	tags: any = "";
	yOffset: any = "";
	callback: any;
	renewed:any;
	index:any;
	loaded:any;


	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
	            public alertCtrl: AlertController, public storage: Storage, public http: Http, public platform: Platform,
	            public modalCtrl: ModalController, public loadingCtrl: LoadingController,
	            public fetchDatas: FetchDataProvider, public imageLoader:ImageLoader) {


	}

	ngOnInit(): void {

		this.postList = this.navParams.get('thisWeekPost');
		this.postListIndex = this.navParams.get('thisWeekPostIndex');
		this.tags = this.postList;
		this.callback = this.navParams.get("callback");
		this.content.resize();



	}
	complete(){
		this.loaded = true;
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

	ionViewWillEnter() {
		if(this.renewed === "hello"){
			let yOffset = document.getElementById(this.index).offsetTop;
			this.content.scrollTo(0, yOffset, 0);
		}
		else{
			this.yOffset = document.getElementById(this.postListIndex).offsetTop;
			this.content.scrollTo(0, this.yOffset, 0);
		}


	}


	ionViewDidLoad() {

	}

	public dismiss() {
		let renewedData = "notRenewed";
		// this.viewCtrl.dismiss(renewedData)

		this.navCtrl.pop();

		// this.navCtrl.pop();

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
						// console.log('Cancel clicked');
					}
				},
				{
					text: 'Delete',
					handler: () => {
						this.fetchDatas.postData('/post/delete', {
							_id: this.postList[i]._id,
							writtenBy: this.postList[i].writtenBy
						}).then(data => {
							this.callback("hello").then(() => {
								this.navCtrl.pop();
							});

						});
					}
				}
			]
		});
		alert.present();
	}
	myCallbackFunction = (_params,_params2) => {
		return new Promise((resolve, reject) => {
			this.renewed = _params;
			this.index = _params2;
			resolve();
		});
	};
	goToTag(tagName, i) {
		console.log(tagName);
		this.navCtrl.push(TagPage, {tagName: tagName,callback:this.myCallbackFunction.bind(this),index:i});
	}




}
