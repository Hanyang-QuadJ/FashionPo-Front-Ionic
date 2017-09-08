import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Content, ActionSheetController} from 'ionic-angular';
import {Platform, ModalController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FetchDataProvider} from "../../../../providers/fetch-data/fetch-data";

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
              public camera: Camera,
              public loadingCtrl: LoadingController,
              public fetchDatas: FetchDataProvider,
              public actionSheetCtrl: ActionSheetController
  ) {

  }

  ngOnInit(): void {
    this.fetchDatas.getData('/user/authed').then(data=>{
      this.profile_img = data.user[0].profile_img;
    });

  }
  public dismiss(){
    this.viewCtrl.dismiss()
  }
  public presentActionSheet() {
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }
  pictureTaken :boolean = false;
  public takePicture(sourceType){
    let options = {
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
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.pictureTaken = true;

      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.base64Image);

    })
  }
  update() {
    this.fetchDatas.getData('/user/authed').then(data=>{
      let loading = this.loadingCtrl.create({
        showBackdrop: true, spinner: 'crescent',
      });
      loading.present();
      this.email = data.user[0].email;
      this.fetchDatas.postData('/user/update/profile',{base_64: this.base64Image, email: this.email}).then(data=>{
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'update success',
          duration: 2000
        });
        toast.present();
      },err=>{
        console.log(err)
      })
    });
  }
}
