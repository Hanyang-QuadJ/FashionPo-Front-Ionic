import {Component, OnInit} from '@angular/core';
import {
	NavController,
	NavParams,
	ViewController,
	ModalController,
	LoadingController,
	Platform,
	ActionSheetController
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import {FavoriteUserPostPage} from '../favorite-user/favorite-user-post/favorite-user-post'
import {FavoriteUserThisWeekPage} from '../favorite-user/favorite-user-this-week/favorite-user-this-week';
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import {RankWardrobePage} from "../../RankPage/rank-wardrobe/rank-wardrobe";
import {VoteWardrobePage} from "../../VotePage/vote/vote-wardrobe/vote-wardrobe";
import {TabsPage} from "../../tabs/tabs";


/**
 * Generated class for the FavoriteUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-favorite-user',
	templateUrl: 'favorite-user.html',
})
export class FavoriteUserPage implements OnInit {
	favUser: any = "";
	posts: Array<any> = [];
	thisWeekPost: Array<any> = [];
	favUsers: any = "";

	backRefresh: boolean;
	User: any;
	button: boolean = false;
	try: boolean = false;
	weekCheck: boolean;
	showFavorite: boolean;
	favorites: any;
	newTab: any;
	loaded: boolean;
	loadedd: boolean;
	showAdd: boolean;
	dismissNew: any;
	callback:any;
	checkPost: boolean;
	checkThis: any = "";
	alertThis: boolean;
	addDismiss: any;


	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController, private storage: Storage, public modalCtrl: ModalController,
	            private http: Http, public platform: Platform,
	            public fetchDatas: FetchDataProvider, public actionSheetCtrl: ActionSheetController) {
		this.weekCheck = false;

	}

	ngOnInit(): void {
		this.newTab = 'fit';
		this.posts = [];
		this.thisWeekPost = [];

		this.checkThis = 0;
		this.checkPost = false;
		this.backRefresh = false;
		this.alertThis = false;
		this.showAdd = false;
		this.favUser = this.navParams.get('favList');
		this.dismissNew = this.navParams.get('dismiss');
		this.addDismiss = this.navParams.get('addDismiss');
		this.callback = this.navParams.get('callback');
		if (this.dismissNew === 'dismiss') {
			this.fetchDatas.postData('/user/news/delete', {id: this.favUser._id}).then(data => {
				// console.log(data);
			}, err => {
				// console.log(err)
			});
			// console.log('dismissed');
		}
		if (this.addDismiss === "addDismiss") {

			this.fetchDatas.postData('/user/addNews/delete', {id: this.favUser._id}).then(data => {
				// console.log(data)
			})

		}

		this.fetchDatas.postData('/post/view', {user_id: [this.favUser._id]}).then(data => {
		});

		if (this.favUser.favorites.length === 0 || this.favUser.favorites === undefined) {
			this.loadedd = true;
		}
		else {
			this.fetchDatas.postData('/user', {users: this.favUser.favorites}).then(data => {
				this.favorites = data;

			});
		}


		this.fetchDatas.postData('/user', {users: [this.favUser._id]}).then(data => {
			this.User = data[0];
			if (this.User.showFavorite === false) {
				this.showFavorite = true;
			}
			this.fetchDatas.getData('/user/authed').then(data => {
				if (data.user[0]._id === this.User._id) {
					this.showAdd = true;
				}
				if (data.user[0].favorites.indexOf(this.User._id) !== -1) {
					this.button = true;
				}
				else
					this.button = false;


			})
		});
		this.fetchDatas.postData('/post/userid', {_id: this.favUser._id}).then(data => {
			for (var i = 0; i < data.length; i++) {
				if (data[i].isThisWeek === true) {
					this.thisWeekPost.push(data[i]);
				}
				else if (data[i].isThisWeek === false) {
					this.posts.push(data[i]);
				}
			}
			if (this.thisWeekPost.length === 0) {
				this.weekCheck = true;
			}
			if (this.posts.length === 0 || this.posts === undefined) {
				this.loaded = true;
			}

		});


	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad FavoriteUserPage');
	}

	public dismiss() {
		this.viewCtrl.dismiss();
	}

	presentFavModal(i) {
		this.navCtrl.push(FavoriteUserPostPage, {
			postList: this.posts.slice().reverse(),
			postListIndex: 'fit' + i
		});


	}

	presentUserModal(i) {
		this.navCtrl.push(VoteWardrobePage, {user_id: this.favorites[i]});

	}

	presentThisWeekModal(i) {
		this.navCtrl.push(FavoriteUserThisWeekPage, {
			thisWeekPost: this.thisWeekPost.slice().reverse(),
			thisWeekPostIndex: 'fit' + i
		});

	}

	addFavorite() {
		this.button = true;
		this.try = true;
		this.fetchDatas.postData('/user/favorite', {_id: this.User._id}).then(data => {
			this.button = true;
			this.try = false;
		});

	}

	public dismissRefresh() {
		this.callback("hello").then(() => {
			this.navCtrl.pop();
		});
	}

	removeFavorite(post) {
		this.button = false;
		this.try = true;
		this.fetchDatas.deleteData('/user/favorite', {_id: this.User._id}).then(data => {
				this.try = false;
				this.backRefresh = true;
			},
			err => {
			});
	}

	presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Block',
			buttons: [
				{
					text: 'Block this user',
					role: 'destructive',
					handler: () => {
						this.fetchDatas.postData('/user/blacklist', {user_id: this.User._id}).then(data => {
							console.log(data);
							if (this.button === true) {
								this.fetchDatas.deleteData('/user/favorite', {_id: this.User._id}).then(data => {
										this.navCtrl.setRoot(TabsPage, {}, {direction: 'back'});
									},
									err => {
									});
							}
							else{
								this.navCtrl.setRoot(TabsPage, {}, {direction: 'back'});
							}
						});
						console.log('Destructive clicked');
					}
				},
			]
		});
		actionSheet.present();
	}


}
