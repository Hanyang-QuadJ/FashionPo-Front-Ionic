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
                public fetchDatas: FetchDataProvider,
    ) {
        this.usernameForm = this.fb.group({
            username: ['', Validators.compose([Validators.maxLength(15),Validators.minLength(2),Validators.required])],

        });
    }

    ngOnInit(): void {
      this.fetchDatas.getData('/user/authed').then(data=>{

        this.usernameForm.value.username = data.user[0].username;
        this.usernameForm.setValue({username:data.user[0].wardrobeName});
        this.loaded = true;
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
      this.fetchDatas.postData('/user/update/wardrobe',{wardrobeName: this.usernameForm.value.username}).then(data=>{
        this.dismiss();
      },
        err=>{
          this.showToast("bottom");
        });
    }


}


