import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {TabsPage} from "../tabs/tabs";
import { ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {SignupPage} from "../signup/signup";


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
        password: ['', Validators.compose([Validators.minLength(12), Validators.required])]
      });
    }

  ngOnInit(): void {
    this.storage.get('token').then((val) => {
      const token = val;
      if (token != null && token != '') {

        this.navCtrl.setRoot(TabsPage);
      }
    });
  }
  goToSignup() {
      this.navCtrl.setRoot(SignupPage);
  }
    showToast(position: string) {
        let toast = this.toastCtrl.create({
            message: 'Check your email or password',
            duration: 2000,
            position: position
        });

        toast.present(toast);
    }


    userLogin() {
        var APIUrl = '/auth';


        if (this.platform.is('ios') == true){
          APIUrl = 'http://54.162.160.91/api/auth';
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
                    this.storage.set('token', data.token);
                    this.navCtrl.setRoot(TabsPage);
                },
                err => {
                    this.showToast("bottom");
                });
    }



}
