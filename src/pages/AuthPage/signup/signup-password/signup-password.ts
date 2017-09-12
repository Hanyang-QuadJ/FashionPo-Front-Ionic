import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginPage} from "../../login/login";

/**
 * Generated class for the SignupPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-password',
  templateUrl: 'signup-password.html',
})
export class SignupPasswordPage {
  loginForm : FormGroup;
  wardrobename:any;
  username:any;

  constructor(public navCtrl: NavController, public http: Http,public navParams: NavParams,
              public fb: FormBuilder, public platform:Platform,
              public toastCtrl:ToastController) {
    this.wardrobename = this.navParams.get('wardrobename');
    this.username = this.navParams.get('username');
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.pattern("[a-zA-Z0-9]+@fitnyc.edu"),Validators.required])],
      password: ['', Validators.compose([Validators.minLength(12), Validators.required])],
      password2: ['', Validators.compose([Validators.minLength(12), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPasswordPage');
  }
  goBackToSignin(){
    this.navCtrl.pop();
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present();
  }
  userSignup() {
    var APIUrl = '/auth';

    if (this.platform.is('ios') == true) {
      APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/auth';
      // console.log('yes');
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = {
      email: this.loginForm.value.email,
      username: this.username,
      wardrobeName: this.wardrobename,
      password: this.loginForm.value.password,
      password2: this.loginForm.value.password2,

    };
    this.http.post(APIUrl + "/register", JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          this.showToast("bottom", "User successfully created");
          this.navCtrl.setRoot(LoginPage,{email:this.loginForm.value.email,password:this.loginForm.value.password});
        },
        err => {
          console.log(err);
          this.showToast("bottom", "error occured");
        });
  }

}
