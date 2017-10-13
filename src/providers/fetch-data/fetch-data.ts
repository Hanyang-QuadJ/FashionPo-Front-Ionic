import {Injectable, Injector} from '@angular/core';
import {Http, Headers, RequestOptions,} from '@angular/http';
import {Storage} from '@ionic/storage';
import {Platform, App} from 'ionic-angular';
import {LoginPage} from "../../pages/AuthPage/login/login";
import {ImageLoader} from "ionic-image-loader";


import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the FetchDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FetchDataProvider {
	token: any;


	constructor(public http: Http,
	            public storage: Storage,
	            public platform: Platform,
	            public imgLoader:ImageLoader,
	            public app: App) {

		this.getData('/post/random').then(data => {
			if (data.message === [] || data.message.length === 0 || data.message === undefined) {

			}
			else {
				for(let i = 0; i<data.message.length; i++){
					this.imgLoader.preload(data.message[i].picURL)
				}
			}

		}, err => {
			if (err.status === 405) {

			}
			else if (err.status === 400) {

			}
			else if (err.status === 404) {

			}

		});
		// console.log('Hello FetchDataProvider Provider');

	}




	public getData(type) {
		return new Promise<any>((resolve, reject) => {
			this.storage.get('token').then((val) => {
				let APIUrl = type;
				// if (this.platform.is('ios') == true){
				//   APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api'+type;
				//   // // console.log('yes');
				// }
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				headers.append('x-access-token', val);
				this.http.get(APIUrl, {headers: headers})
					.map(res => res.json())
					.subscribe(data => {
							resolve(data);
						},
						err => {
							if (err.status === 410) {
								// let nav = this.app.getActiveNav();
								this.app.getRootNav().setRoot(LoginPage, {check: 'logout'});
							}
							else if (err.status === 500) {
							}

							reject(err)

						});
			}, err => {
				if (err.status === 410) {
					this.app.getRootNav().setRoot(LoginPage, {check: 'logout'});


				}

				reject(err)
			});
		});
	}

	public postData(type, content: any) {
		return new Promise<any>((resolve, reject) => {
			this.storage.get('token').then((val) => {
				let APIUrl = type;
				// if (this.platform.is('ios') == true) {
				// 	APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api' + type;
				// 	// // console.log('yes');
				// }
				let body = content;
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				headers.append('x-access-token', val);
				this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
					.map(res => res.json())
					.subscribe(data => {
						resolve(data);
					}, err => {
						if (err.status === 410) {
							this.app.getRootNav().setRoot(LoginPage, {check: 'logout'});


						}
						reject(err);
					});
			});
		});
	}

	public deleteData(type, content: any) {
		return new Promise<any>((resolve, reject) => {
			this.storage.get('token').then((val) => {
				let APIUrl = type;
				// if (this.platform.is('ios') == true) {
				// 	APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api' + type;
				// 	// // console.log('yes');
				// }
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				headers.append('x-access-token', val);
				let body = content;
				let options = new RequestOptions({
					headers: headers,
					body: body
				});
				this.http.delete(APIUrl, options)
					.map(res => res.json())
					.subscribe(data => {
							resolve(data);
						},
						err => {
							if (err.status === 410) {
								this.app.getRootNav().setRoot(LoginPage, {check: 'logout'});
							}
							reject(err)
						});
			});
		});

	}


}

