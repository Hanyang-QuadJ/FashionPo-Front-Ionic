import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Content} from 'ionic-angular';
import {Platform, ModalController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FetchDataProvider} from "../../../../providers/fetch-data/fetch-data";

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
                public fetchDatas: FetchDataProvider,
    ) {
        this.usernameForm = this.fb.group({
            password1: ['', Validators.compose([Validators.required])],
            password2: ['', Validators.compose([Validators.required])],

        });
    }

    ngOnInit(): void {
      this.fetchDatas.getData('/user/authed').then(data=>{
      })

    }

    public dismiss() {
        this.viewCtrl.dismiss()
    }

    showToast(position: string) {
        let toast = this.toastCtrl.create({
            message: 'wrong password',
            duration: 2000,
            position: position,
            cssClass:'general',
        });

        toast.present(toast);
    }

    public usernameChange() {
      this.fetchDatas.postData('/user/changepw',{password1: this.usernameForm.value.password1,
        password2: this.usernameForm.value.password2}).then(data=>{
        this.dismiss();
      },
        err=>{
          this.showToast("bottom");
        });


    }


}


