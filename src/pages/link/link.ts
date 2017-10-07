import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {FetchDataProvider} from "../../providers/fetch-data/fetch-data";


/**
 * Generated class for the LinkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-link',
	templateUrl: 'link.html',
})
export class LinkPage {
	usernameForm: FormGroup;
	loaded: boolean = false;
	callback: any;
	link;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public fb: FormBuilder, public fetchDatas: FetchDataProvider) {
		this.usernameForm = this.fb.group({
			username: ['', Validators.compose([Validators.required])],

		});
		this.callback = this.navParams.get('callback');
		this.fetchDatas.getData('/user/authed').then(data => {
			this.link = data.user[0].link;
			this.loaded = true;
		});


	}

	public usernameChange() {
		this.fetchDatas.postData('/user/update/link', {link: this.usernameForm.value.username}).then(data => {
				this.callback("hello").then(() => {
					this.navCtrl.pop();
				});
			},
			err => {

			})
	}

	public dismiss() {
		this.viewCtrl.dismiss()
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LinkPage');
	}

}
