import {Component, ViewChild} from '@angular/core';
import {
	NavController,
	NavParams,
	ViewController,
	Content,
	ModalController,
	AlertController,
	ToastController
} from 'ionic-angular';
import {TagPage} from "../../../tag/tag";
import {FetchDataProvider} from "../../../../providers/fetch-data/fetch-data";

/**
 * Generated class for the FavoriteUserThisWeekPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-favorite-user-this-week',
	templateUrl: 'favorite-user-this-week.html',
})
export class FavoriteUserThisWeekPage {
	@ViewChild(Content) content: Content;
	postList: any;
	postListIndex: "";
	date: "";
	renewed:any;
	index:any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public toastCtrl: ToastController, public alertCtrl: AlertController, public fetchData:FetchDataProvider) {
		this.postList = this.navParams.get('thisWeekPost');
		this.postListIndex = this.navParams.get('thisWeekPostIndex');
		this.date = this.navParams.get('date');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FavoriteUserThisWeekPage');
	}

	ionViewWillEnter() {
		if(this.renewed === "hello"){
			let yOffset = document.getElementById(this.index).offsetTop;
			this.content.scrollTo(0, yOffset, 0);
		}
		else{
			this.scrollToCard();
		}

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
		this.navCtrl.push(TagPage, {tagName: tagName,callback:this.myCallbackFunction.bind(this),index:'fit'+i});
	}

	scrollToCard() {
		let yOffset = document.getElementById(this.postListIndex).offsetTop;
		console.log(yOffset)
		this.content.scrollTo(0, yOffset, 0);
	}

	public dismiss() {
		this.viewCtrl.dismiss()
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

	showRadio(i) {
		let alert = this.alertCtrl.create();
		alert.setTitle('Report this post');

		alert.addInput({
			type: 'radio',
			label: 'Objectionable content',
			value: 'insult',
			checked: true
		});
		alert.addInput({
			type: 'radio',
			label: 'Spam',
			value: 'spam',
			checked: false
		});

		alert.addButton('Cancel');
		alert.addButton({
			text: 'OK',
			handler: () => {
				this.fetchData.postData('/post/report', {post_id: this.postList[i]._id}).then(data => {
					console.log(data);
				});
				console.log(this.postList[i]._id);
				this.showToast();
			}
		});
		alert.present();
	}

	showToast() {
		let toast = this.toastCtrl.create({
			message: 'Report has been accepted',
			duration: 2000,
			position: 'bottom',
			cssClass: 'general',
		});

		toast.present();
	}

}
