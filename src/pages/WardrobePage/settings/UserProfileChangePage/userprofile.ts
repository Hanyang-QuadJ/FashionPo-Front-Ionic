import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Content, ActionSheetController} from 'ionic-angular';
import {Platform, ModalController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FetchDataProvider} from "../../../../providers/fetch-data/fetch-data";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'username-profile',
	templateUrl: 'userprofile.html',
})

export class UserProfileChange {
	base64Image: any;
	profile_img: any;
	callback: any;
	pictureTaken: boolean;
	email: any;

	constructor(public viewCtrl: ViewController,
	            public fb: FormBuilder,
	            public platform: Platform,
	            private storage: Storage,
	            private http: Http,
	            public navCtrl: NavController,
	            public navParams: NavParams,
	            public toastCtrl: ToastController,
	            public camera: Camera,
	            public loadingCtrl: LoadingController,
	            public fetchDatas: FetchDataProvider,
	            public actionSheetCtrl: ActionSheetController) {
		this.callback = this.navParams.get('callback');
		this.pictureTaken = false;


	}

	ngOnInit(): void {
		this.fetchDatas.getData('/user/authed').then(data => {
			this.profile_img = data.user[0].profile_img;
		});

	}

	public dismiss() {
		this.viewCtrl.dismiss()
	}

	public presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Profile Image',
			buttons: [
				{
					text: 'Delete current image',
					role: 'destructive',
					handler: () => {
						this.fetchDatas.postData('/user/remove/profile', {something: "hello"}).then(data => {
							console.log("134234234");
							this.callback("hello").then(() => {
								this.navCtrl.pop();
							});
						})
					}
				}, {
					text: 'Choose picture from library',
					handler: () => {
						this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);

					}
				}, {
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}
	showToast(position: string) {
		let toast = this.toastCtrl.create({
			message: 'Please update your profile image',
			duration: 2000,
			position: position,
			cssClass: 'general',
		});

		toast.present(toast);
	}



	public takePicture(sourceType) {
		let options = {
			quality: 50,
			allowEdit: true,
			correctOrientation: false,
			saveToPhotoAlbum: false,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: sourceType,
		};
		this.camera.getPicture(options).then((imageData) => {
			// imageData is a base64 encoded string
			this.base64Image = "data:image/jpeg;base64," + imageData;
			this.pictureTaken = true;
			let cameraImageSelector = document.getElementById('image');
			cameraImageSelector.setAttribute('src', this.base64Image);

		})
	}

	update() {
		if(this.base64Image==="" || this.base64Image===undefined){
			this.showToast("bottom");

		}
		else{
			this.fetchDatas.getData('/user/authed').then(data => {
				let loading = this.loadingCtrl.create({
					showBackdrop: true, spinner: 'crescent',
				});
				loading.present();
				this.email = data.user[0].email;
				this.fetchDatas.postData('/user/update/profile', {
					base_64: this.base64Image,
					email: this.email
				}).then(data => {
					loading.dismiss();
					this.callback("hello").then(() => {
						this.navCtrl.pop();
					});
				}, err => {
					console.log(err)
				})
			});

		}

	}
}
