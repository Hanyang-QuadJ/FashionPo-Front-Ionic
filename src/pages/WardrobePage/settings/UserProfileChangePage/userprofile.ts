import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Content} from 'ionic-angular';
import {Platform, ModalController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'username-profile',
  templateUrl: 'userprofile.html',
})

export class UserProfileChange {
  base64Image: any;
  profile_img: any;

  email : any;
  constructor(public viewCtrl: ViewController,
              public fb: FormBuilder,
              public platform: Platform,
              private storage: Storage,
              private http: Http,
              public toastCtrl: ToastController,
              public camera: Camera
  ) {

  }

  ngOnInit(): void {
    var APIUrl_1 = '/user/authed';
    if (this.platform.is('ios') == true){
      APIUrl_1 = 'http://54.162.160.91/api/user/authed';
    }
    this.storage.get('token').then((val) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      // console.log(val);
      let body = {
        base_64: this.base64Image,


      };

      this.http.get(APIUrl_1 + '/authed', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.profile_img = data.user[0].profile_img;
        });

    });

  }

  pictureTaken :boolean = false;
  public takePicture(sourceType){
    let options = {
      targetWidth: 500,
      targetHeight: 800,
      quality: 70,
      allowEdit: true,
      correctOrientation: false,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.pictureTaken = true;
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.base64Image);

    })

  }
  update() {
    var APIUrl = '/user';
    if (this.platform.is('ios') == true){
      APIUrl = 'http://54.162.160.91/api/user';
    }
    this.storage.get('token').then((val) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      // console.log(val);
      this.http.get(APIUrl + '/authed', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.email = data.user[0].email;
          this.storage.get('token').then((val) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', val);
            // console.log(val);
            let body = {
              base_64: this.base64Image,
              email: this.email
            };
            this.http.post(APIUrl + "/update/profile", JSON.stringify(body), {headers: headers})
              .map(res => res.json())
              .subscribe(
                data => {
                  let toast = this.toastCtrl.create({
                    message: 'update success',
                    duration: 2000
                  });

                  toast.present(toast);
                },
                err => {

                });
          }, (err) => {
            console.log(err);
          });
        });

    });


  }
}
