import {Component} from '@angular/core';
import {ActionSheetController, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {TabsPage} from "../../tabs/tabs";
import { ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {FilePath} from "@ionic-native/file-path";
import {Transfer} from "@ionic-native/transfer";
import {Camera} from "@ionic-native/camera";


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
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.pattern("[a-zA-Z0-9]+@fitnyc.edu"),Validators.required])],
      username: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(12), Validators.required])]
    });
  }

  ngOnInit(): void {

  }
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
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
        password: this.loginForm.value.password,
        base_64: this.base64Image
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

  pictureTaken :boolean = false;

  public takePicture(sourceType){
    let options = {
      targetWidth: 500,
      targetHeight: 500,
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

}
