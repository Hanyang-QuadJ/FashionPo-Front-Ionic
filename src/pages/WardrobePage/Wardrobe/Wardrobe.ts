import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, ModalController, Content, LoadingController} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {PostTabPage} from "../../WardrobePage/post-tab/post-tab";
import {FavoriteTabPage} from "../../WardrobePage/favorite-tab/favorite-tab";
import {SettingsPage} from "../../WardrobePage/settings/settings";
import {WardrobeThisWeekPage} from '../../WardrobePage/wardrobe-this-week/wardrobe-this-week'
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import {WardrobePhotoPage} from "../wardrobe-photo/wardrobe-photo";
import {FavoriteUserPage} from "../favorite-user/favorite-user";
import {LogPage} from "../log/log";
import {TabsPage} from "../../tabs/tabs";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ImageLoader} from "ionic-image-loader";


// import {TabsPage} from "../tabs/tabs";


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-register',
	templateUrl: 'wardrobe.html',

})


export class WardrobePage {
	public toggled: boolean;
	min: Number = null;
	checkRank: boolean;
	user: any = "";
	top: Array<any> = [];
	userIntro: any = "";
	noneCheck: boolean;
	loaded: boolean;
	loadedd: boolean;
	weekPast: any;
	mypostlist: Array<any> = [];
	thisWeekPost: Array<any> = [];
	thisWeekPostLength: boolean;
	callback:any;
	index:any;
	@ViewChild(Content) content: Content;

	option: string = "";
	favorites: Array<any> = [];

	postAlert: string = "";
	addCount: any;
	name: any;
	renewed: any;


	date: Array<string> = [];
	newTab: any;
	otherPage: any;
	otherPage2: any;
	otherPage3:any;

	isNewPost: Array<boolean>;
	isNewAdd: boolean = false;
	link:any;


	button_loaded: boolean = false;
	today_disable: boolean = false;


	constructor(public navCtrl: NavController,
	            public navParams: NavParams,
	            private storage: Storage,
	            private http: Http,
	            public fetchDatas: FetchDataProvider,
	            public modalCtrl: ModalController,
	            public loadingCtrl: LoadingController,
	            public iab : InAppBrowser,
	            public imgLoader:ImageLoader,
	            public platform: Platform) {
		this.thisWeekPostLength = false;
		this.newTab = "fit";
		this.mypostlist = [];
		this.thisWeekPost = [];
		this.isNewPost = [];
		this.callback = this.navParams.get('callback');
		this.fetchData();
		console.log(this.navParams.get("check"));
		if (this.navParams.get("check") === "otherPage") {
			this.otherPage = true;
		}
		else if (this.navParams.get("check") === "otherPage2") {
			this.otherPage2 = true;
		}
		else if (this.navParams.get("check") === "otherPage3") {
			this.otherPage3 = true;
		}


	}
	dismissRefresh(){
		this.callback("hello",this.index).then(() => {
			this.navCtrl.pop();
		});
	}

	popToRoot() {
		this.navCtrl.parent.parent.setRoot(TabsPage);
	}
	goToLink(){
		if(this.link.includes("https://") || this.link.includes("http://")){
			this.iab.create(this.link);
		}
		else{
			this.iab.create("https://"+this.link);
		}
	}

	Settings() {
		this.navCtrl.push(SettingsPage, {users: this.user,callback:this.myCallbackFunction.bind(this)}, {});
	}

	test() {
		this.navCtrl.parent.select(1);
	}

	fetchData() {
		this.isNewPost = [];
		this.mypostlist = [];
		this.checkRank = false;
		this.noneCheck = false;
		this.thisWeekPost = [];
		this.top = [];
		this.loaded = false;
		this.loadedd = false;
		this.option = "favorites";
		// console.log('1');
		// console.log(this.thisWeekPost);

		this.fetchDatas.getData('/user/authed').then(data => {
			this.link = data.user[0].link;
			this.weekPast = data.user[0].isHistoryNew;
			if (data.user[0].addNews.length !== 0) {
				this.isNewAdd = true;
				this.addCount = data.user[0].addNews.length;
			}
			else {
				this.isNewAdd = false;
			}
			this.user = data.user[0];
			this.imgLoader.preload(this.user.profile_img);
			this.userIntro = data.user[0].introduce;
			this.button_loaded = true;
			this.fetchDatas.getData('/rank').then(data => {

				for (let i = 0; i < data.posts.length; i++) {
					if (data.posts[i].writtenBy === this.user._id) {
						this.top.push(i + 1);
					}
				}
				if (this.top.length === 0) {
					this.checkRank = true;
				}
				else {
					this.min = Math.min(...this.top);
				}
			}, err => {
				// console.log(err);
			});
			this.fetchDatas.getData('/post/myposts').then(data => {
				this.mypostlist = [];
				this.thisWeekPost = [];
				if (data.posts.length === 0) {
					this.noneCheck = true;
				}
				for (var i = 0; i < data.posts.length; i++) {
					//This week fits
					if (data.posts[i].isThisWeek === true) {
						this.thisWeekPost.push(data.posts[i]);
					}
					//Past fits
					else {
						this.mypostlist.push(data.posts[i]);
					}

				}
				for(let i = 0; i<this.thisWeekPost.length; i++){
					this.imgLoader.preload(this.thisWeekPost[i].picURL)
				}
				for(let i = 0; i<this.mypostlist.length; i++){
					this.imgLoader.preload(this.mypostlist[i].picURL)
				}
				if (this.thisWeekPost.length === 0) {
					this.thisWeekPostLength = true;
				}
				else {
					this.thisWeekPostLength = false;
				}
				if (this.mypostlist.length === 0 || this.mypostlist === undefined) {
					this.loaded = true;
				}
				else {
					this.loaded = false;
				}
				// console.log('2');
				// console.log(this.thisWeekPost);

			});
			this.fetchDatas.getData('/user/favorite').then(data => {
				if (data.favorites === undefined || data.favorites.length === 0) {
					this.favorites = [];
					this.loadedd = true;

				}
				else {
					this.fetchDatas.postData('/user', {users: data.favorites}).then(data => {
						this.favorites = data;
						for(let i = 0; i<this.favorites.length;i++){
							this.imgLoader.preload(this.favorites[i].profile_img);
						}
						this.loadedd = false;
						this.fetchDatas.getData('/user/authed').then(data => {
							this.isNewPost = [];
							if (data.user[0].news === [] || data.user[0].news.length === 0) {

								for (let i = 0; i < this.favorites.length; i++) {
									this.isNewPost.push(false);
								}

							}
							else {
								let user: Array<any> = data.user[0].news;
								// console.log("Check!");
								// console.log(this.favorites);
								// console.log(user);
								for (let i = 0; i < this.favorites.length; i++) {
									// console.log(user.indexOf(this.favorites[i]._id));
									if (user.indexOf(this.favorites[i]._id) === -1) {
										this.isNewPost.push(false)
									}
									else if (user.indexOf(this.favorites[i]._id) > -1) {
										this.isNewPost.push(true)
									}
								}

								// console.log(this.isNewPost);
							}

						});
					})
				}
			});
		});
	}

	refresh() {
		this.fetchDatas.getData('/user/favorite').then(data => {
			if (data.favorites === undefined || data.favorites.length === 0) {
				this.favorites = [];
				this.loadedd = true;

			}
			else {
				this.fetchDatas.postData('/user', {users: data.favorites}).then(data => {
					this.favorites = data;
					for(let i = 0; i<this.favorites.length;i++){
						this.imgLoader.preload(this.favorites[i].profile_img);
					}
					this.loadedd = false;
					this.fetchDatas.getData('/user/authed').then(data => {
						this.isNewPost = [];
						if (data.user[0].news === [] || data.user[0].news.length === 0) {

							for (let i = 0; i < this.favorites.length; i++) {
								this.isNewPost.push(false);
							}

						}
						else {
							let user: Array<any> = data.user[0].news;
							// console.log("Check!");
							// console.log(this.favorites);
							// console.log(user);
							for (let i = 0; i < this.favorites.length; i++) {
								// console.log(user.indexOf(this.favorites[i]._id));
								if (user.indexOf(this.favorites[i]._id) === -1) {
									this.isNewPost.push(false)
								}
								else if (user.indexOf(this.favorites[i]._id) > -1) {
									this.isNewPost.push(true)
								}
							}

							// console.log(this.isNewPost);
						}

					});
				})
			}
		});

	}

	ionViewWillEnter() {
		if (this.weekPast === true) {
			this.fetchData();
		}

		if (this.renewed === "hello") {
			console.log("what");
			this.fetchData();
		}
		this.fetchDatas.getData('/user/authed').then(data => {
			if (data.user[0].addNews.length !== 0) {
				this.isNewAdd = true;
				this.addCount = data.user[0].addNews.length;
			}
			else {
				this.isNewAdd = false;
			}
		})

		// console.log("Check DATA FETCH");
	}

	favNewCheck() {

	}

	ionViewDidEnter() {
		console.log("Did enter");
	}

	myCallbackFunction = (_params) => {
		return new Promise((resolve, reject) => {
			this.renewed = _params;
			resolve();
		});
	};


	presentThisWeekModal(i) {
		console.log(i);
		this.navCtrl.push(WardrobeThisWeekPage, {
			callback: this.myCallbackFunction.bind(this),
			thisWeekPost: this.thisWeekPost.slice().reverse(),
			thisWeekPostIndex: i,
		}, {});

	};

	presentProfileModal(i) {

		this.navCtrl.push(WardrobePhotoPage, {
			callback: this.myCallbackFunction.bind(this),
			postList: this.mypostlist.slice().reverse(),
			postListIndex: i,
		});

	}

	presentLogModal() {
		this.navCtrl.push(LogPage, {callback: this.myCallbackFunction.bind(this)});
	}

	dismiss() {
		this.navCtrl.pop();
	}

	presentFavModal(i) {
		// console.log(this.isNewPost[i]);
		if (this.isNewPost[i] === true) {

			let dismiss = 'dismiss';
			this.navCtrl.push(FavoriteUserPage, {
				callback: this.myCallbackFunction.bind(this),
				favList: this.favorites[i],
				dismiss: dismiss,
			});


		}
		else if (this.isNewPost[i] === false) {
			this.navCtrl.push(FavoriteUserPage, {
				callback: this.myCallbackFunction.bind(this),
				favList: this.favorites[i]
			});


		}


	}

	refreshViewCnt() {
		this.today_disable = true;
		this.button_loaded = false;
		this.fetchDatas.getData('/user/authed').then(data => {
			this.user = data.user[0];
			this.button_loaded = true;
			this.today_disable = false;
		});
	}

	ionViewWillLeave() {
		this.renewed = "";
	}

	ionSelected() {
		this.content.scrollToTop();
	}


}





