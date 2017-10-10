import {Component, ViewChild,} from '@angular/core';
import {IonicPage, NavController, NavParams, Content, ViewController, ModalController} from 'ionic-angular';
import {FavoriteUserPage} from "../../WardrobePage/favorite-user/favorite-user";
import {TagPage} from "../../tag/tag";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import {WardrobePage} from "../../WardrobePage/wardrobe/wardrobe";
import {VoteWardrobePage} from "../../VotePage/vote/vote-wardrobe/vote-wardrobe";
import {ImageLoader} from "ionic-image-loader";

/**
 * Generated class for the TagListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-tag-list',
	templateUrl: 'tag-list.html',
})
export class TagListPage {
	@ViewChild(Content) content: Content;
	thisWeekPost: any;
	selectedPost: any;
	thisWeekPostIndex: "";
	date: any = "";
	tagPageCheck: any = "";
	users: any = "";
	tagUsers:Array<any>=[];
	like: boolean;
	user: any;
	order: string = 'likeCnt';
	orderDate: string = 'writtenAt';
	renewed: any;
	index: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController,
	            public fetchDatas: FetchDataProvider,public imgLoader:ImageLoader) {
		this.thisWeekPost = this.navParams.get('thisWeekPost');

		this.thisWeekPostIndex = this.navParams.get('thisWeekPostIndex');
		this.tagPageCheck = this.navParams.get('pageCheck');
		this.users = this.navParams.get('user');
		// this.fetchDatas.postData('/user', {users: this.users}).then(data => {
		// 	for (let j = 0; j < data.length; j++) {
		// 		this.tagUsers.push(data[j]);
		// 	}
		// 	console.log("????????");
		// 	console.log(this.tagUsers);
		// });
		this.like = this.navParams.get('like');

		this.fetchDatas.getData('/user/authed').then(data => {
			this.user = data.user[0];
		})


	}

	ionViewWillEnter() {
		if(this.renewed === "hello"){
			let yOffset = document.getElementById('fit'+this.index).offsetTop;
			this.content.scrollTo(0, yOffset, 0);
		}
		else{
			this.scrollToCard();
		}

	}

	scrollToCard() {
		let yOffset = document.getElementById('fit'+this.thisWeekPostIndex).offsetTop;
		this.content.scrollTo(0, yOffset, 0);
	}

	public dismiss() {
		this.viewCtrl.dismiss()
	}


	presentWardrobe(i) {
		if (this.users[i]._id !== this.user._id) {
			this.navCtrl.push(VoteWardrobePage, {user_id: this.users[i],callback:this.myCallbackFunction.bind(this),fromSpeed:"speed",index:i});
		}
		else {
			this.navCtrl.push(WardrobePage, {check: "otherPage3",callback:this.myCallbackFunction.bind(this),index:i});
		}
		// console.log(this.users[i]._id);

	}

	goToTag(tagName, i) {
		console.log(tagName);
		this.navCtrl.push(TagPage, {tagName: tagName, callback: this.myCallbackFunction.bind(this), index: i});
	}

	myCallbackFunction = (_params, _params2) => {
		return new Promise((resolve, reject) => {
			this.renewed = _params;
			this.index = _params2;
			resolve();
		});
	};


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

	ionViewDidLoad() {
		console.log('ionViewDidLoad TagListPage');
	}

}
