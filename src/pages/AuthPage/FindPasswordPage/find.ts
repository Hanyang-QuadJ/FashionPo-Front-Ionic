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
    selector: 'find',
    templateUrl: 'find.html',
})

export class FindPasswordPage {
    usernameForm: FormGroup;
    loaded: boolean = false;

    constructor(public viewCtrl: ViewController,
                public fb: FormBuilder,
                public platform: Platform,
                private storage: Storage,
                private http: Http,
                public toastCtrl: ToastController,) {
        this.usernameForm = this.fb.group({
            username: ['', Validators.compose([Validators.required])],

        });
    }

    ngOnInit(): void {

    }

    public dismiss() {
        this.viewCtrl.dismiss()
    }

    showToast(position: string) {
        let toast = this.toastCtrl.create({
            message: 'this username is already used',
            duration: 2000,
            position: position
        });

        toast.present(toast);
    }

    public usernameChange() {

        var APIUrl = '/auth';


        if (this.platform.is('ios') == true){
            APIUrl = 'http://54.162.160.91/api/auth';
            // console.log('yes');
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = {
            email: this.usernameForm.value.username,
        }
        console.log(this.usernameForm.value.username);
        this.http.post(APIUrl + '/findpw', JSON.stringify(body), {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    this.dismiss();
                },
                err => {
                    this.showToast("bottom");
                });

    }


}


