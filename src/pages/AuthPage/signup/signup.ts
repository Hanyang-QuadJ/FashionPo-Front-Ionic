import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {TabsPage} from "../../tabs/tabs";
import { ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  loginForm : FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              private storage: Storage,
              public platform: Platform,
              public toastCtrl: ToastController,
              public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.pattern("[a-zA-Z0-9]+@fitnyc.edu"),Validators.required])],
      username: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(12), Validators.required])]
    });
  }

  ngOnInit(): void {

  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
  }

    userSignup() {
      var APIUrl = '/auth';


      if (this.platform.is('ios') == true) {
        APIUrl = 'http://54.162.160.91/api/auth';
        // console.log('yes');
      }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let body = {
        email: this.loginForm.value.email,
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      this.http.post(APIUrl + "/register", JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {
            this.showToast("bottom", "User successfully created");
            this.navCtrl.pop();
          },
          err => {
            this.showToast("bottom", "error occured");
          });
    }



}
