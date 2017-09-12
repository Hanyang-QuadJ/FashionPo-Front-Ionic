import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignupPasswordPage} from "../signup-password/signup-password";

/**
 * Generated class for the SignupNamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-signup-name',
  templateUrl: 'signup-name.html',
})
export class SignupNamePage {
  loginForm : FormGroup;
  wardrobename:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fb: FormBuilder,public viewCtrl:ViewController) {
    this.wardrobename = this.navParams.get('wardrobename');
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.minLength(2), Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupNamePage');
  }
  goBackToSignin(){
    this.navCtrl.pop();
  }
  goToPassword(){
    this.navCtrl.push(SignupPasswordPage,{username:this.loginForm.value.username, wardrobename:this.wardrobename});
  }

}
