/**
 * Created by jeonghyunlee on 2017. 8. 9..
 */
import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Content,} from 'ionic-angular';
import {Platform, ModalController, LoadingController, AlertController, ActionSheetController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Http, Headers, RequestOptions} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {VoteThisWeekPage} from '../vote-wardrobe/vote-this-week/vote-this-week'
import {VotePhotoPage} from '../vote-wardrobe/vote-photo/vote-photo'
import {FetchDataProvider} from "../../../../providers/fetch-data/fetch-data";
import {FavoriteUserPage} from "../../../WardrobePage/favorite-user/favorite-user";
import {HomePage} from "../../../RankPage/home/home";
import {TabsPage} from "../../../tabs/tabs";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ImageLoader} from "ionic-image-loader";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'vote-wardrobe',
	templateUrl: 'vote-wardrobe.html',
})

export class VoteWardrobePage {
	usernameForm: FormGroup;
	User_id: any;
	User: any;
	back:any;
	loaded: boolean;
	loadedd: boolean;
	button_loaded: boolean = true;
	posts: any = "";
	weekCheck: boolean;
	thisWeekPost: any = "";
	button: boolean = false;
	favorites: any;
	try: boolean = false;
	view_cnt: any;
	showFavorite: boolean;
	showAdd: boolean;
	newTab: any;
	renewed:any;
	index:any;
	callback:any;
	link:any;



	today_disable = false;

	constructor(public viewCtrl: ViewController,
	            public fb: FormBuilder,
	            public platform: Platform,
	            private storage: Storage,
	            private http: Http,
	            public actionSheetCtrl: ActionSheetController,
	            public toastCtrl: ToastController,
	            public navParams: NavParams,
	            public loadingCtrl: LoadingController,
	            public modalCtrl: ModalController,
	            public alertCtrl: AlertController,
	            public navCtrl: NavController,
	            public fetchDatas: FetchDataProvider,
	            public imgLoader:ImageLoader,
	            public iab:InAppBrowser) {
		this.weekCheck = false;
		this.showAdd = false;
		this.callback = this.navParams.get('callback');
		this.index = this.navParams.get('index');
		this.usernameForm = this.fb.group({
			username: ['', Validators.compose([Validators.required])],
		});
		if(this.navParams.get('fromSpeed')==="speed"){
			this.back = true;
		}
	}

	ngOnInit(): void {
		this.newTab = 'fit';
		this.posts = [];


		this.thisWeekPost = [];
		this.User_id = this.navParams.get('user_id');
		this.fetchDatas.postData('/user', {users: [this.User_id]}).then(data => {
			this.User = data[0];
			this.imgLoader.preload(this.User.profile_img);

			this.link = this.User.link;
			// console.log("Wowwww");
			// console.log(this.User._id);
			if (this.User.showFavorite === false) {
				this.showFavorite = true;
			}
			if (this.User.favorites.length === 0 || this.User.favorites === undefined) {
				this.loadedd = true;
			}
			else {
				this.fetchDatas.postData('/user', {users: this.User.favorites}).then(data => {
					this.favorites = data;
					for(let i = 0; i<this.favorites.length;i++){
						this.imgLoader.preload(this.favorites[i].profile_img);
					}
				});
			}
			this.fetchDatas.postData('/post/userid', {_id: [this.User_id]}).then(data => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].isThisWeek === true) {
						this.thisWeekPost.push(data[i]);
					}
					else {
						this.posts.push(data[i]);
					}
				}

				if (this.thisWeekPost.length === 0) {
					this.weekCheck = true;
				}
				if (this.posts.length === 0 || this.posts === undefined) {
					this.loaded = true;
				}
				for(let i = 0; i<this.thisWeekPost.length; i++){
					this.imgLoader.preload(this.thisWeekPost[i].picURL)
				}
				for(let i = 0; i<this.posts.length; i++){
					this.imgLoader.preload(this.posts[i].picURL)
				}
				this.fetchDatas.postData('/post/view', {user_id: [this.User_id]}).then(data => {
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
				})
			})
		});

	}

	public dismiss() {
		this.viewCtrl.dismiss()
	}

	addFavorite() {
		this.button = true;
		this.try = true;
		this.fetchDatas.postData('/user/favorite', {_id: this.User._id}).then(data => {
			this.button = true;
			this.try = false;
		});

	}
	goToLink(){
		if(this.link.includes("https://") || this.link.includes("http://")){
			this.iab.create(this.link);
		}
		else{
			this.iab.create("https://"+this.link);
		}
	}


	removeFavorite(post) {
		this.button = false;
		this.try = true;
		this.fetchDatas.deleteData('/user/favorite', {_id: this.User._id}).then(data => {
				this.try = false;
			},
			err => {
			});

	}
	dismissRefresh(){
		this.callback("hello",this.index).then(() => {
			this.navCtrl.pop();
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
						this.fetchDatas.postData('/user/blacklist', {user_id: this.User_id}).then(data => {
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
							console.log(data);
						});
						console.log('Destructive clicked');
					}
				},
			]
		});
		actionSheet.present();
	}


	refreshViewCnt() {
		this.today_disable = true;
		this.button_loaded = false;
		this.User_id = this.navParams.get('user_id');
		this.fetchDatas.postData('/user', {users: [this.User_id]}).then(data => {
			this.User = data[0];
			this.view_cnt = data[0].viewCnt;
			this.button_loaded = true;
			this.today_disable = false;
		});
	}

	presentFavModal(i) {
		this.navCtrl.push(VotePhotoPage, {
			postList: this.posts.slice().reverse(),
			postListIndex: i
		});

	}

	presentThisWeekModal(i) {
		this.navCtrl.push(VoteThisWeekPage, {
			thisWeekPost: this.thisWeekPost.slice().reverse(),
			thisWeekPostIndex:i
		});
	}

	presentUserModal(i) {
		this.navCtrl.push(FavoriteUserPage, {favList: this.favorites[i]});
	}
}
