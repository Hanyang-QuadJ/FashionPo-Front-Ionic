import {Component} from '@angular/core';
import {ActionSheetController, NavController, NavParams, Platform} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Camera} from "@ionic-native/camera";
import {LoginPage} from "../login/login";
import {FilePath} from "@ionic-native/file-path";
import {Transfer} from "@ionic-native/transfer";
import {StatusBar} from "@ionic-native/status-bar";

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
  public base64Image: any;

  constructor(private http: Http,
              private storage : Storage,
              private camera: Camera,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              private statusBar: StatusBar,
              public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.pattern("[a-zA-Z0-9]+@fitnyc.edu"),Validators.required])],
      username: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      wardrobename: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(12), Validators.required])],
      password2: ['', Validators.compose([Validators.minLength(12), Validators.required])]
    });
  }

  ngOnInit(): void {
    this.statusBar.styleDefault();
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
      username: this.loginForm.value.username,
      wardrobeName: this.loginForm.value.wardrobename,
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
  goBackToSignin(){
    this.navCtrl.pop();
  }



}

