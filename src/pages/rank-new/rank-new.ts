import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content} from 'ionic-angular';
import {VoteWardrobePage} from "../VotePage/vote/vote-wardrobe/vote-wardrobe";
import {TagPage} from "../tag/tag";
import {WardrobePage} from "../WardrobePage/wardrobe/wardrobe";
import {FetchDataProvider} from "../../providers/fetch-data/fetch-data";
import {FavoriteUserPage} from "../WardrobePage/favorite-user/favorite-user";
import {ImageLoader} from "ionic-image-loader";


/**
 * Generated class for the RankNewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-rank-new',
	templateUrl: 'rank-new.html',
})
export class RankNewPage {
	@ViewChild(Content) content: Content;
	user: any;
	authed:any;
	rank: any;
	startDate: any;
	endDate: any;
	index: any;
	rankIndex:any;
	renewed:any;
	firstUser:any;
	firstPost:any;



	constructor(public navCtrl: NavController, public navParams: NavParams, public fetchDatas: FetchDataProvider, public imgLoader:ImageLoader) {
		this.user = this.navParams.get('users');
		this.firstUser = this.navParams.get('firstUser');
		this.firstPost = this.navParams.get('firstPost');
		this.rank = this.navParams.get('rank');
		this.startDate = this.navParams.get('startDate');
		this.endDate = this.navParams.get('endDate');
		this.rankIndex = this.navParams.get('index');
		console.log(this.rankIndex);
		this.fetchDatas.getData('/user/authed').then(data => {
			this.authed = data.user[0];
		});
		this.imgLoader.preload(this.firstPost.picURL);
		for(let i = 0; i<this.rank.length;i++){
			this.imgLoader.preload(this.rank[i].picURL);
		}

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
	scrollToCard() {
		let yOffset = document.getElementById(this.rankIndex).offsetTop;
		this.content.scrollTo(0, yOffset, 0);
	}

	public dismiss() {
		this.navCtrl.pop();
	}
	myCallbackFunction = (_params, _params2) => {
		return new Promise((resolve, reject) => {
			this.renewed = _params;
			this.index = _params2;
			resolve();
		});
	};
	goToTag(tagName, i) {
		console.log(tagName);
		this.navCtrl.push(TagPage, {tagName: tagName, callback: this.myCallbackFunction.bind(this), index: i});
	}

	presentFirstWardrobe() {
		if (this.firstPost._id !== this.authed._id) {

			this.navCtrl.push(VoteWardrobePage, {user_id: this.firstUser, callback:this.myCallbackFunction.bind(this),index:0,fromSpeed:"speed"});
		}
		else {
			this.navCtrl.push(WardrobePage, {check: "otherPage"});
		}
		// console.log(this.users[i]._id);

	}

	presentWardrobe(i) {
		if (this.user[i]._id !== this.authed._id) {
			console.log("crazy!!");
			this.navCtrl.push(VoteWardrobePage, {user_id: this.user[i],callback:this.myCallbackFunction.bind(this),index:i+1,fromSpeed:"speed"});
		}
		else {
			this.navCtrl.push(WardrobePage, {check: "otherPage3",callback:this.myCallbackFunction.bind(this),index:i+1,});
		}
		// console.log(this.users[i]._id);

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RankNewPage');
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
	parsingDate2(date) {
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
		return day + ", " + year;
	}
	parsingDate3(date) {
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
		return month + " " + day
	}
	ionViewWillLeave(){
		this.index="";
	}

}
