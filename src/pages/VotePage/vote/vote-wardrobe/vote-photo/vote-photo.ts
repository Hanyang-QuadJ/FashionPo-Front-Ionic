import {Component, ViewChild, OnInit} from '@angular/core';
import {
	NavController,
	NavParams,
	Content,
	ViewController,
	ModalController,
	PopoverController,
	AlertController,
	ToastController
} from 'ionic-angular';
import {TagPage} from "../../../../tag/tag";
import {FetchDataProvider} from "../../../../../providers/fetch-data/fetch-data";


/**
 * Generated class for the RankPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-vote-photo',
	templateUrl: 'vote-photo.html',
})
export class VotePhotoPage {
	@ViewChild(Content) content: Content;
	postList: any = "";
	postListIndex: any = "";
	date: any = "";

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController,
	            public popoverCtrl: PopoverController, public alertCtrl: AlertController, public toastCtrl: ToastController, public fetchData: FetchDataProvider) {
		this.postList = navParams.get('postList');
		this.postListIndex = navParams.get('postListIndex');
		this.date = this.navParams.get('date');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RankPhotoPage');
	}

	ionViewWillEnter() {
		this.scrollToCard()
	}

	public dismiss() {
		this.viewCtrl.dismiss()
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


	scrollToCard() {
		let yOffset = document.getElementById(this.postListIndex).offsetTop;
		console.log(yOffset)
		this.content.scrollTo(0, yOffset, 0);
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

	goToTag(tagName, i) {
		console.log(tagName);
		let tagModal = this.modalCtrl.create(TagPage, {tagName: tagName});
		tagModal.onDidDismiss((check) => {
			let yOffset = document.getElementById('fit' + i).offsetTop;
			this.content.scrollTo(0, yOffset, 0);
		});
		tagModal.present();

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

