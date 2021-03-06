import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {TabsPage} from "../../tabs/tabs";
import {ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {SignupPage} from "../signup/signup";
import {FindPasswordPage} from "../FindPasswordPage/find";
import {IntroPage} from "../../intro/intro";
import {StatusBar} from "@ionic-native/status-bar";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";



/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class LoginPage {

	loginForm: FormGroup;
	check: any;
	back: boolean = false;
	email: any = "";
	password: any = "";

	constructor(public navCtrl: NavController,
	            public navParams: NavParams,
	            private http: Http,
	            private statusBar: StatusBar,
	            private storage: Storage,
	            public platform: Platform,
	            public toastCtrl: ToastController,
	            public fetchDatas: FetchDataProvider,
	            public fb: FormBuilder) {
		this.statusBar.styleLightContent();
		this.check = this.navParams.get('check');
		this.email = this.navParams.get('email');
		this.password = this.navParams.get('password');


		this.loginForm = this.fb.group({
			email: ['', Validators.compose([Validators.pattern("[a-zA-Z0-9_!@#$%^&*()?]+@fitnyc.edu"), Validators.required])],
			password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
		});
	}


	ngOnInit(): void {
		console.log(this.platform);
		this.back = false;
		if (this.check === "logout") {
			this.back = true;
		}
		else {
			this.back = false;
		}
		// this.storage.get('token').then((val) => {
		//   const token = val;
		//   if (token != null && token != '') {
		//
		//     this.navCtrl.setRoot(TabsPage);
		//   }
		// });
	}

	goToSignup() {
		this.navCtrl.push(SignupPage);
	}

	goBackToWelcome() {
		this.navCtrl.pop();
	}

	goToFind() {
		this.navCtrl.push(FindPasswordPage);
	}

	showToast(position: string) {
		let toast = this.toastCtrl.create({
			message: 'Check your email or password',
			duration: 2000,
			position: position,
			cssClass: 'general',
		});

		toast.present(toast);
	}


	userLogin() {
		var APIUrl = '/auth';
		if (this.platform.is('ios') == true) {
			APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/auth';
			// console.log('yes');
		}
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let body = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		};
		this.http.post(APIUrl + "/login", JSON.stringify(body), {headers: headers})
			.map(res => res.json())
			.subscribe(
				data => {
					this.storage.set('token', data.token).then((val) => {
						let APIUrl_2 = 'user/tutorial/value';
						if (this.platform.is('ios') == true){
						  APIUrl_2 = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/user/tutorial/value';
						  // console.log('yes');
						}
						let headers2 = new Headers();
						headers2.append('Content-Type', 'application/json');
						headers2.append('x-access-token', val);
						this.http.get(APIUrl_2, {headers: headers2})
							.map(res => res.json())
							.subscribe(data => {
								if (data.tutorial === 1) {
									this.navCtrl.setRoot(TabsPage);
								}
								else {
									this.navCtrl.setRoot(IntroPage);
								}
							})
					});
					// this.storage.get('token').then((val)=>{
					//   let headers2 = new Headers();
					//   headers2.append('Content-Type', 'application/json');
					//   headers2.append('x-access-token', val);
					//   this.http.get('/user/tutorial/value',{headers:headers2})
					//     .map(res=>res.json())
					//     .subscribe(data=>{
					//       if(data.tutorial === 1){
					//         this.navCtrl.setRoot(TabsPage);
					//       }
					//       else{
					//         this.navCtrl.setRoot(IntroPage);
					//       }
					//     })
					// });


				},
				err => {
					this.showToast("bottom");
				});
	}


}

