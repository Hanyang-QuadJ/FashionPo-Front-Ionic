import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Content} from 'ionic-angular';
import {Platform, ModalController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'find',
	templateUrl: 'find.html',
})

export class FindPasswordPage {
	usernameForm: FormGroup;
	loaded: boolean = false;

	constructor(public viewCtrl: ViewController,
	            public fb: FormBuilder,
	            public platform: Platform,
	            private storage: Storage,
	            private http: Http,
	            public toastCtrl: ToastController,) {
		this.usernameForm = this.fb.group({
			username: ['', Validators.compose([Validators.required])],

		});
	}

	ngOnInit(): void {

	}

	public dismiss() {
		this.viewCtrl.dismiss()
	}

	showToast(position: string, err: any) {
		let toast = this.toastCtrl.create({
			message: err,
			duration: 2000,
			position: position
		});

		toast.present(toast);
	}

	public usernameChange() {

		let APIUrl = '/auth';

		// if (this.platform.is('ios') == true) {
		// 	APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/auth';
		// }

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let body = {
			email: this.usernameForm.value.username,
		};
		this.http.post(APIUrl + '/findpw', JSON.stringify(body), {headers: headers})
			.map(res => res.json())
			.subscribe(
				data => {
					this.dismiss();
				},
				err => {
					console.log(err);
				});

	}


}


