
import {Component, ViewChild, ViewChildren, QueryList, OnInit} from '@angular/core';

import {
  ActionSheetController, Loading, LoadingController, NavController, NavParams, Platform,
  ToastController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';
import 'rxjs/Rx';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { PhotoLibrary } from '@ionic-native/photo-library';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@Component({
  selector: 'page-playground',
  templateUrl: 'Camera.html'
})

export class CameraPage implements OnInit{
  public base64Image: any;
  public tags:Array<object> = [];

  constructor(private http: Http,
              private storage : Storage,
              private camera: Camera,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public loadingCtrl: LoadingController)
  {

  }
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'invalid user info',
      duration: 2000,
      position: position
    });

    toast.present(toast);
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
        var APIUrl = '/post';
        if (this.platform.is('ios') == true){
          APIUrl = 'http://54.162.160.91/api/post';
          // console.log('yes');
        }
        this.storage.get('token').then((val) => {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('x-access-token', val);
          // console.log(val);
          let body = {
            base_64: this.base64Image,
            tags:[{'tag':'Selstagram'},{'tag':'Mukstagram'}]

          };
          this.http.post(APIUrl + "/s3upload", JSON.stringify(body), {headers: headers})
            .map(res => res.json())
            .subscribe(
              data => {
                let toast = this.toastCtrl.create({
                  message: 'upload success',
                  duration: 2000
                });

                toast.present(toast);
              },
              err => {

              });
        }, (err) => {
          console.log(err);
        });

      })

  }

  ngOnInit(): void {

  }


}