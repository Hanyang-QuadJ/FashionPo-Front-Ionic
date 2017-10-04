import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, App, Content, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {VotePage} from '../../VotePage/vote/vote'
import {ToastController, ModalController, ViewController, Toast, Modal} from 'ionic-angular';
import {HistoryListPage} from '../history-list/history-list'
import {RankWardrobePage} from "../rank-wardrobe/rank-wardrobe";
import {TagPage} from "../../tag/tag";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import * as moment from 'moment';
import 'moment-timezone';
import {VoteWardrobePage} from "../../VotePage/vote/vote-wardrobe/vote-wardrobe";
import {IntroPage} from "../../intro/intro";
import {Network} from "@ionic-native/network";
import {WardrobePage} from "../../WardrobePage/wardrobe/wardrobe";


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',

})


export class HomePage implements OnInit {

	modalCheck: boolean;
	rankDate: any = "";
	allUsers: any;
	allTags: any;


	ranks: Array<any> = [];
	oriRank: Array<any> = [];
	users: Array<any> = [];
	buttons: Array<any> = [];
	picURL: string = "";
	date: any;

	order: string = 'tagCnt';
	writtenBys: Array<any> = [];
	@ViewChild(Content) content: Content;

	private toastInstance: Toast;
	private modalInstance: Modal;
	public toggled: boolean;
	public searchToggled: boolean;

	pushPage: any;
	user: any;
	loading: any;
	historyRank: any;
	firstCheck: boolean;
	startDate: any;
	endDate: any;
	historyNew: boolean;
	dismissHistory: any;

	firstPost: any;
	firstUser: any;
	search: any;
	try: boolean = false;
	nameCheck: Array<any> = [];
	rankEmpty: boolean;
	renewed:any;
	index:any;

	firstButton: boolean;


	constructor(public navCtrl: NavController,
	            public navParams: NavParams,
	            private storage: Storage,
	            private http: Http,
	            public fetchDatas: FetchDataProvider,
	            public platform: Platform,
	            private toastCtrl: ToastController,
	            public modalCtrl: ModalController,
	            private app: App,
	            public loadingCtrl: LoadingController,
	            public viewCtrl: ViewController,
	            private network: Network,) {

		this.historyRank = this.navParams.get('rankSheet');
		this.dismissHistory = this.navParams.get('dismiss');
		this.search = "user";
	}

	ngOnInit(): void {

		if (this.dismissHistory === 'dismiss') {
			this.fetchDatas.postData('/user/setHistory', {}).then(data => {
				// console.log(data);
			});


		}
		this.initializeItems();
		this.startDate = moment().tz("America/New_York").startOf('week').format();
		this.endDate = moment().tz("America/New_York").endOf('week').format();
		this.getHistoryNew();

	}

	public getHistoryNew() {
		this.fetchDatas.getData('/user/authed').then(data => {
			// console.log(data.user[0].isHistoryNew);
			if (data.user[0].isHistoryNew === true) {
				this.historyNew = true;
			}
			else {
				this.historyNew = false;
			}
		});
	}


	ionViewWillEnter() {
		this.content.resize();


		// console.log('Rank Data Check');
		this.firstCheck = false;
		this.modalCheck = false;
		this.users = [];
		this.ranks = [];
		this.oriRank = [];
		this.writtenBys = [];

		this.pushPage = VotePage;
		this.toggled = false;
		this.rankEmpty = false;
		this.searchToggled = false;

		//Fetch Data Start!

		if (this.historyRank === undefined) {
			this.fetchDatas.getData('/rank').then(data => {

				if (data.posts === undefined || data.posts.length === 0) {
					this.rankEmpty = true;

				}
				else {

					for (let d = 0; d < data.posts.length; d++) {
						this.oriRank[d] = data.posts[d];
					}
					for (var i = 1; i < data.posts.length; i++) {
						this.ranks[i - 1] = data.posts[i];
					}
					this.firstPost = data.posts[0];
					for (let i = 0; i < data.posts.length; i++) {
						this.writtenBys.push(data.posts[i].writtenBy);
					}
					this.fetchDatas.postData('/user', {users: this.writtenBys}).then(data => {
						this.firstUser = data[0];
						this.users = [];
						for (let i = 1; i < data.length; i++) {
							this.users.push(data[i]);
						}
						this.fetchDatas.getData('/user/authed').then(data => {
							this.user = data.user[0];
							// console.log(this.user);

							if (this.firstUser._id === this.user._id) {
								this.firstCheck = true;

							}

							for (let i = 0; i < this.ranks.length; i++)
								this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
							this.firstButton = this.user.favorites.indexOf(this.firstPost.writtenBy) !== -1;

						})
					})

				}

			});
		}
		//History Rank!
		else if (this.historyRank !== undefined) {

			this.modalCheck = true;
			this.rankDate = this.navParams.get('rankDate');
			if (this.historyRank === [] || this.historyRank.length === 0 || this.historyRank === undefined) {

			}
			else {
				for (let a = 0; a < this.historyRank.length; a++) {
					this.oriRank[a] = this.historyRank[a];
				}
				for (var i = 1; i < this.historyRank.length; i++) {
					this.ranks[i - 1] = this.historyRank[i];
				}
				this.firstPost = this.historyRank[0];
				for (let i = 0; i < this.historyRank.length; i++) {
					this.writtenBys.push(this.historyRank[i].writtenBy);
				}
				this.fetchDatas.postData('/user', {users: this.writtenBys}).then(data => {
					this.firstUser = data[0];
					this.users = [];
					for (let i = 1; i < data.length; i++) {
						this.users.push(data[i]);
					}
					this.fetchDatas.getData('/user/authed').then(data => {
						this.user = data.user[0];
						if (this.firstUser._id === this.user._id) {
							this.firstCheck = true;
							// // console.log(this.firstCheck);
						}
						for (let j = 0; j < this.ranks.length; j++) {
							this.nameCheck[j] = false;
							if (this.ranks[j].writtenBy === this.user._id) {
								this.nameCheck[j] = true;
							}
						}
						for (let i = 0; i < this.ranks.length; i++)
							this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
						this.firstButton = this.user.favorites.indexOf(this.firstPost.writtenBy) !== -1;

					})
				})
			}

		}
	}

	//Refresher
	doRefresh(refresher) {
		this.firstCheck = false;
		this.modalCheck = false;
		this.users = [];
		this.ranks = [];
		this.oriRank = [];
		this.writtenBys = [];

		this.pushPage = VotePage;
		this.toggled = false;
		this.allUsers = [];
		this.searchToggled = false;
		this.initializeItems();
		this.fetchDatas.getData('/rank').then(data => {
			if (data.posts === undefined || data.posts.length === 0) {
				this.rankEmpty = true;
				refresher.complete();
			}
			for (let d = 0; d < data.posts.length; d++) {
				this.oriRank[d] = data.posts[d];
			}
			for (var i = 1; i < data.posts.length; i++) {
				this.ranks[i - 1] = data.posts[i];
			}
			this.firstPost = data.posts[0];
			for (let i = 0; i < data.posts.length; i++) {
				this.writtenBys.push(data.posts[i].writtenBy);
			}
			this.fetchDatas.postData('/user', {users: this.writtenBys}).then(data => {
				this.firstUser = data[0];
				this.users = [];
				for (let i = 1; i < data.length; i++) {
					this.users.push(data[i]);
				}
				this.fetchDatas.getData('/user/authed').then(data => {
					this.user = data.user[0];
					if (this.firstUser._id === this.user._id) {
						this.firstCheck = true;

					}
					for (let i = 0; i < this.ranks.length; i++)
						this.buttons[i] = this.user.favorites.indexOf(this.ranks[i].writtenBy) !== -1
					this.firstButton = this.user.favorites.indexOf(this.firstPost.writtenBy) !== -1;
					refresher.complete();
				})
			})
		});
	}

	//Favorite Functions

	addFavorite(post) {
		this.try = true;
		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i]._id === post.writtenBy) {
				if (this.buttons[i] === true) {
					this.buttons[i] = false;
				}
				else
					this.buttons[i] = true;
			}
		}
		if (this.firstUser._id === post.writtenBy) {
			if (this.firstButton === true) {
				this.firstButton = false;
			}
			else
				this.firstButton = true;
		}
		this.fetchDatas.postData('/user/favorite', {_id: post.writtenBy}).then(data => {
			this.try = false;
		});

	}

	removeFavorite(post) {
		this.try = true;
		// // console.log(post);
		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i]._id === post.writtenBy) {
				if (this.buttons[i] === true) {
					this.buttons[i] = false;
				}
				else
					this.buttons[i] = true;
			}
		}
		if (this.firstUser._id === post.writtenBy) {
			if (this.firstButton === true) {
				this.firstButton = false;
			}
			else
				this.firstButton = true;
		}
		this.fetchDatas.deleteData('/user/favorite', {_id: post.writtenBy}).then(data => {
			this.try = false;
		});

	}

	//Search


	initializeItems() {
		this.allUsers = [];
		this.fetchDatas.getData('/user/authed').then(data => {
			this.user = data.user[0];
			this.fetchDatas.getData('/user/blacklist/' + this.user._id).then(data => {
				let blackUser: any = data.blackList;
				console.log("haha");
				console.log(blackUser);
				this.fetchDatas.getData('/user/all').then(data => {
					for (let i = 0; i < data.usersList.length; i++) {
						if (blackUser.indexOf(data.usersList[i]._id) === -1) {
							this.allUsers.push(data.usersList[i]);
						}
					}
				});
			});

		});


	}

	getItems(ev) {

		this.fetchDatas.getData('/user/authed').then(data => {
			this.user = data.user[0];
			this.fetchDatas.getData('/user/blacklist/' + this.user._id).then(data => {
				let blackUser: any = data.blackList;
				console.log("haha");
				console.log(blackUser);
				this.fetchDatas.getData('/user/all').then(data => {

					this.allUsers = [];
					for (let i = 0; i < data.usersList.length; i++) {
						if (blackUser.indexOf(data.usersList[i]._id) === -1) {
							this.allUsers.push(data.usersList[i]);
						}
					}
					let val = ev.target.value;
					// if the value is an empty string don't filter the items
					if (val && val.trim() != '') {

						this.allUsers = this.allUsers.filter((item) => {
							return (item.wardrobeName.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
						});

					}
				});
			});

		});
		// this.fetchDatas.getData('/user/all').then(data => {
		// 	this.allUsers = data.usersList;
		// 	let val = ev.target.value;
		// 	// if the value is an empty string don't filter the items
		// 	if (val && val.trim() != '') {
		// 		this.allUsers = this.allUsers.filter((item) => {
		// 			return (item.wardrobeName.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
		// 		});
		//
		//
		// 	}
		// });


		this.fetchDatas.getData('/search/searchTag/' + ev.target.value).then(data => {
			this.allTags = data.message;
		}, err => {
			if (err.status === 404) {

			}
		})

	}

	presentToast() {
		if (this.toastInstance) {
			return;
		}

		this.toastInstance = this.toastCtrl.create({
			message: 'Check your network',
			position: 'bottom',
			cssClass: 'general',
			showCloseButton: true,
			closeButtonText: 'OK',
		});

		this.toastInstance.onDidDismiss(() => {
			this.toastInstance = null;
		});

		this.toastInstance.present();

	}

	//PresentModals
	presentHistoryModal() {
		if (this.historyNew === true) {
			let historyModal = this.modalCtrl.create(HistoryListPage, {}, {leaveAnimation: 'back'});
			historyModal.onDidDismiss(() => {
				this.getHistoryNew();
			});
			historyModal.present();
		}
		else {
			let historyModal = this.modalCtrl.create(HistoryListPage, {}, {leaveAnimation: 'back'});
			historyModal.present();
		}

	}

	presentWardrobeModal(i) {
		if (this.users[i]._id === this.user._id) {
			this.navCtrl.push(WardrobePage, {check: "otherPage"});
		}
		else {
			this.navCtrl.push(VoteWardrobePage, {
				user_id: this.users[i],
			});

		}


	}

	presentFirstModal() {
		if (this.firstUser._id === this.user._id) {
			this.navCtrl.push(WardrobePage, {check: "otherPage"});
		}
		else {
			this.navCtrl.push(VoteWardrobePage, {
				user_id: this.firstUser,
				rank: this.oriRank
			});

		}


	}

	public dismiss() {
		this.viewCtrl.dismiss()
	}

	presentSearchModal(i) {
		if (this.allUsers[i]._id !== this.user._id) {
			let searchModal = this.modalCtrl.create(VoteWardrobePage, {user_id: this.allUsers[i]}, {leaveAnimation: 'back'});
			searchModal.present();
		}
		else {
			this.navCtrl.push(WardrobePage, {check: "otherPage"});

			// this.navCtrl.parent().select(2);

		}

	}
	myCallbackFunction = (_params,_params2) => {
		return new Promise((resolve, reject) => {

			resolve();
		});
	};



	goToTag(tagName) {
		console.log(tagName);
		this.navCtrl.push(TagPage, {tagName: tagName,callback:this.myCallbackFunction.bind(this),index:'fit'});
	}

	Vote() {
		this.navCtrl.parent.parent.setRoot(VotePage, {}, {animate: true, direction: 'back'});

	}

	//Toggles & scrolls
	toggleSearch() {
		this.toggled = this.toggled ? false : true;
		this.searchToggled = true;
		this.content.resize();
	}

	toggleSearch2() {
		this.toggled = this.toggled ? false : true;
		this.searchToggled = false;
		this.content.resize();
	}

	ionSelected() {
		this.content.scrollToTop();
	}

	scrollToTop() {
		this.content.scrollToTop();
		// this.navCtrl.push(IntroPage);
	}

	ionViewWillLeave(){
		this.renewed = "";
		this.index ="";
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
		return month + " " + day
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
}
