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
    selector: 'wardrobe-settings',
    templateUrl: 'wardrobename.html',
})

export class ChangeWardrobeNamePage {
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
            username: ['', Validators.compose([Validators.required])],

        });
    }

    ngOnInit(): void {
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/authed';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://54.162.160.91/api/user/authed';
            //   // console.log('yes');
            // }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            this.http.get(APIUrl, {headers: headers})
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data.user[0].username);
                        this.usernameForm.value.username = data.user[0].username;
                        this.usernameForm.setValue({username:data.user[0].wardrobeName});
                        this.loaded = true;
                    });


        });
    }

    public dismiss() {
        this.viewCtrl.dismiss()
    }

    showToast(position: string) {
        let toast = this.toastCtrl.create({
            message: 'this wardrobe name is already used',
            duration: 2000,
            position: position
        });

        toast.present(toast);
    }

    public usernameChange() {
        this.storage.get('token').then((val) => {
            var APIUrl = '/user/update/wardrobe';
            // if (this.platform.is('ios') == true){
            //   APIUrl = 'http://54.162.160.91/api/user/update/wardrobe';
            //   // console.log('yes');
            // }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            let body = {
                wardrobeName: this.usernameForm.value.username,
            }
            console.log(this.usernameForm.value.username);
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


