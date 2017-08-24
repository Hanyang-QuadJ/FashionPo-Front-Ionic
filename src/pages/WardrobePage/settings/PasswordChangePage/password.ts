import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Content} from 'ionic-angular';
import {Platform, ModalController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'password-settings',
    templateUrl: 'password.html',
})

export class PasswordChangePage {
    usernameForm: FormGroup;
    loaded:boolean = false;
    constructor(public viewCtrl: ViewController,
                public fb: FormBuilder,
                public platform: Platform,
                private storage: Storage,
                private http: Http,
                public toastCtrl: ToastController,
    ) {
        this.usernameForm = this.fb.group({
            password1: ['', Validators.compose([Validators.required])],
            password2: ['', Validators.compose([Validators.required])],

        });
    }

    ngOnInit(): void {
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/authed';
            if (this.platform.is('ios') == true){
              APIUrl = 'http://54.162.160.91/api/user/authed';
              // console.log('yes');
            }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            this.http.get(APIUrl, {headers: headers})
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data.user[0].username);
                    });


        });
    }

    public dismiss() {
        this.viewCtrl.dismiss()
    }

    showToast(position: string) {
        let toast = this.toastCtrl.create({
            message: 'wrong password',
            duration: 2000,
            position: position
        });

        toast.present(toast);
    }

    public usernameChange() {
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/changepw';
            if (this.platform.is('ios') == true){
              APIUrl = 'http://54.162.160.91/api/user/changepw';
              // console.log('yes');
            }
            let headers = new Headers();
            headers.append('Conten-Type', 'application/json');
            headers.append('x-access-token', val);
            let body = {
                password1: this.usernameForm.value.password1,
                password2: this.usernameForm.value.password2
            }
            this.http.post(APIUrl, JSON.stringify(body), {headers: headers})
                .map(res => res.json())
                .subscribe(
                    data => {
                        this.dismiss();
                    },
                    err => {
                        this.showToast("bottom");
                    });


        });
    }


}


