import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';

/**
 * Generated class for the TagInputPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tag-input',
  templateUrl: 'tag-input.html',
})
export class TagInputPage {
	usernameForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder,) {
	  this.usernameForm = this.fb.group({
		  username: ['', Validators.compose([Validators.maxLength(50),Validators.required])],
	  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagInputPage');
  }

}
