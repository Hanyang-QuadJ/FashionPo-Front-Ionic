import {Component, ViewChild, ViewChildren, QueryList, OnInit,} from '@angular/core';

import {
	ActionSheetController, LoadingController, NavController, NavParams, Platform,
	ToastController, ViewController,
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { PhotoLibrary } from '@ionic-native/photo-library';
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import {filter} from "rxjs/operator/filter";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";
import {WardrobePage} from "../../WardrobePage/wardrobe/wardrobe";
import {TagInputPage} from "../../tag-input/tag-input";

declare var cordova: any;

@Component({
	selector: 'page-camera',
	templateUrl: 'camera.html'
})

export class CameraPage implements OnInit {
	public base64Image: any = "";
	backButton: any = "";

	tags: any = [];
	allTags: any;
	comment: any;
	uploadCheck: boolean = false;

	public tagsInput: any;
	public postText: any;


	constructor(private http: Http,
	            private storage: Storage,
	            private camera: Camera,
	            private transfer: Transfer,
	            private file: File,
	            private filePath: FilePath,
	            public actionSheetCtrl: ActionSheetController,
	            public toastCtrl: ToastController,
	            public platform: Platform,
	            public navCtrl: NavController,
	            public fetchDatas: FetchDataProvider,
	            public navParams: NavParams,
	            public viewCtrl: ViewController,
	            public loadingCtrl: LoadingController) {
		this.tagsInput = "";
		this.base64Image = "";
		this.comment = "";
		if (this.navParams.get('fromWardrobe') === "check") {
			this.backButton = true;
		}

	}


	showToast(position: string) {
		let toast = this.toastCtrl.create({
			message: 'invalid user info',
			duration: 2000,
			position: position,
			cssClass: 'general'
		});

		toast.present(toast);
	}

	ionViewWillEnter() {
		this.tags = [];
		this.tagsInput = "";
		this.base64Image = "";
		this.comment = "";
		this.uploadCheck = true;
		let cameraImageSelector = document.getElementById('camera-image');
		cameraImageSelector.setAttribute('src', '');
		this.presentActionSheet();

	}

	public presentActionSheet() {
		this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
	}

	pictureTaken: boolean = false;

	public takePicture(sourceType) {
		let options = {
			quality: 25,
			allowEdit: true,
			correctOrientation: false,
			saveToPhotoAlbum: false,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: sourceType,
		};
		this.camera.getPicture(options).then((imageData) => {
			this.pictureTaken = true;
			// imageData is a base64 encoded string
			this.base64Image = "data:image/jpeg;base64," + imageData;

			let cameraImageSelector = document.getElementById('camera-image');
			cameraImageSelector.setAttribute('src', this.base64Image);
		})

	}

	ngOnInit(): void {


	}

	test() {
		console.log(this.tagsInput)
	}

	post() {
		if (this.base64Image == "") {


			let toast = this.toastCtrl.create({
				message: 'Please choose your picture',
				duration: 2000,
				cssClass: 'general'
			});

			toast.present();

		}
		else if (this.base64Image !== "") {

			let loading = this.loadingCtrl.create({
				showBackdrop: true,
				cssClass: 'loading',
				spinner: 'crescent',
				content: 'Uploading'
			});
			loading.present();
			let jbSplit = this.tagsInput.split('#', 100);
			let myArray = jbSplit.filter(v => v != '');
			let myArray2 = [];
			let Tag = [];
			for (let i = 0; i < myArray.length; i++) {
				myArray2[i] =  myArray[i].trim();
			}
			let finalTag = myArray2.filter(v=>v!='');
			for (let i = 0; i < finalTag.length; i++) {
				Tag[i] =  "#"+finalTag[i];
			}
			for (let j = 0; j < Tag.length; j++) {
				this.tags.push({'tag': Tag[j]})
			}
			this.fetchDatas.postData('/post/create', {
				base_64: this.base64Image,
				tags: this.tags,
				comment: this.comment
			}).then(data => {
				this.uploadCheck = true;
				let toast = this.toastCtrl.create({
					message: 'Upload successfully',
					duration: 2000,
					cssClass: 'general',
				});
				loading.dismiss();
				this.tagsInput = "";
				this.tags = [];
				this.comment = "";
				this.navCtrl.push(WardrobePage, {check: "otherPage2"});

			}, err => {
				console.log(err);
				loading.dismiss();
			});

		}
	}

	public dismiss() {
		this.viewCtrl.dismiss();
	}

	paste(input) {
		let jbSplit = this.tagsInput.split('#', 100);
		let myArray = jbSplit.filter(v => v != '');
		let trimmedArray=[];
		for (let i = 0; i < myArray.length; i++) {
			trimmedArray[i] = myArray[i].trim();
		}
		let sArray = trimmedArray.filter(v => v!= '');
		let final = [];
		let pasteFinal = "";

		for (let i = 0; i < sArray.length - 1; i++) {
			final[i] =("#" + sArray[i]);
		}

		for (let i = 0; i < final.length; i++) {
			pasteFinal = pasteFinal + " " + final[i].toString()
		}
		this.tagsInput = pasteFinal + " " + input + " "

		// if(this.tagsInput.includes("#")){
		// 	this.tagsInput = this.tagsInput+" "+input+" "
		// }
		// else{
		// 	this.tagsInput=input+" ";
		// }
	}

	getItems(ev) {
		let jbSplit = ev.target.value.split('#', 100);
		let myArray = jbSplit.filter(v => v != '');
		if (myArray === [] || myArray === undefined || myArray.length === 0) {

		}
		else {
			let searchString;
			searchString = myArray[myArray.length - 1].toString();
			console.log(searchString);
			this.fetchDatas.getData('/search/searchTag/' + searchString).then(data => {
				this.allTags = data.message.sort(function (a, b) {
					return a.tagCnt > b.tagCnt ? -1 : a.tagCnt < b.tagCnt ? 1 : 0;
				});
			}, err => {
				if (err.status === 404) {

				}
			})
		}


	}


}
