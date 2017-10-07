import {Component} from '@angular/core';
import {NavController, NavParams, App, ModalController, LoadingController, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from "../../AuthPage/login/login";
import {UsernamePage} from "./UsernameChangePage/username";
import {UserProfileChange} from "./UserProfileChangePage/userprofile";
import {PasswordChangePage} from "./PasswordChangePage/password";
import {ChangeWardrobeNamePage} from "./WardrobeNameChangePage/wardrobename";
import {IntroduceChangePage} from "./IntroduceChangePage/introduce";
import {TermsPage} from "../../terms/terms";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import {LicensePage} from "../../license/license";
import {LinkPage} from "../../link/link";
import {ImageLoader} from "ionic-image-loader";


/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {
	user: any = {};
	showFavorite: Boolean;
	renewed:any;
	refreshed:boolean;
	callback:any;

	constructor(public navCtrl: NavController,
	            public navParams: NavParams,
	            private app: App,
	            public loadingCtrl: LoadingController,
	            public modalCtrl: ModalController,
	            public fetchDatas: FetchDataProvider,
	            public alertCtrl: AlertController,
	            public imgLoader:ImageLoader,
	            private storage: Storage) {

		this.fetchDatas.getData('/user/authed').then(data => {
			this.user = data.user[0];
			this.imgLoader.preload(this.user.profile_img);
			this.showFavorite = this.user.showFavorite;
			console.log(this.user);
		})
		this.callback = this.navParams.get("callback")

	}
	refreshdismiss(){
		this.callback("hello").then(() => {
			this.navCtrl.pop();
		});
	}
	dismiss(){
		this.navCtrl.pop();
	}
	ionViewWillEnter(){
		if(this.renewed === "hello"){
			this.refreshed = true;
			this.fetchDatas.getData('/user/authed').then(data => {
				this.user = data.user[0];
			})
		}
	}

	toggleFavorite() {
		if (this.showFavorite) {
			this.fetchDatas.getData('/user/favorite/show').then(data => {
				console.log(data);
			})
		}
		else {
			this.fetchDatas.getData('/user/favorite/hide').then(data => {
				console.log(data);
			})
		}
	}

	presentConfirm() {
		let alert = this.alertCtrl.create({
			title: 'Sign Out',
			message: 'Do you want to Sign Out?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Sign Out',
					handler: () => {
						this.logOut();
					}
				}
			]
		});
		alert.present();
	}

	logOut() {
		this.storage.set('token', null);
		this.app.getRootNav().setRoot(LoginPage, {check: 'logout'});
	}
	myCallbackFunction = (_params) => {
		return new Promise((resolve, reject) => {
			this.renewed = _params;
			resolve();
		});
	};
	presentWebsiteModal(){
		this.navCtrl.push(LinkPage,{callback:this.myCallbackFunction.bind(this)});

	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
		console.log('@@#@#@#@#@');
		console.log(this.user)
	}

	itemSelected(item: string) {
		console.log("Selected Item", item);
	}

	presentUsernameModal() {
		this.navCtrl.push(UsernamePage,{callback:this.myCallbackFunction.bind(this)});
	}

	presentUserProfileModal() {
		this.navCtrl.push(UserProfileChange, {callback:this.myCallbackFunction.bind(this)});
	}

	presentPasswordModal() {
		this.navCtrl.push(PasswordChangePage, {callback:this.myCallbackFunction.bind(this)});

	}

	presentWardrobeModal() {
		this.navCtrl.push(ChangeWardrobeNamePage, {callback:this.myCallbackFunction.bind(this)});

	}

	presentTermsModal() {
		this.navCtrl.push(TermsPage);

	}

	presentLicense() {
		this.navCtrl.push(LicensePage);

	}

	presentIntroduceModal() {
		 this.navCtrl.push(IntroduceChangePage, {callback:this.myCallbackFunction.bind(this)});

	}
	ionViewWillLeave(){
		this.renewed ="";
	}
}
