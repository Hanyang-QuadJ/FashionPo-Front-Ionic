import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, Platform, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignupPasswordPage} from "../signup-password/signup-password";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

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
  loginForm: FormGroup;
  wardrobename: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fb: FormBuilder, public viewCtrl: ViewController, public platform: Platform, public http: Http,
              public toastCtrl: ToastController) {
    this.wardrobename = this.navParams.get('wardrobename');
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.minLength(1), Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupNamePage');
  }

  goBackToSignin() {
    this.navCtrl.pop();
  }
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position,
      cssClass:'general',
    });
    toast.present();
  }

  goToPassword() {
    if (this.loginForm.value.username ==="") {
      this.navCtrl.push(SignupPasswordPage, {username: this.loginForm.value.username, wardrobename: this.wardrobename});
    }
    else {
      let APIUrl = '/auth/username/redundancy';
      if (this.platform.is('ios') == true) {
        APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api/auth/username/redundancy';
        // console.log('yes');
      }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let body = {
        username: this.loginForm.value.username,
      };
      this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {
            console.log(data);
            this.navCtrl.push(SignupPasswordPage, {username: this.loginForm.value.username, wardrobename: this.wardrobename});
          },
          err => {
            this.showToast('bottom', 'username exists!')
          });
    }
  }

}
