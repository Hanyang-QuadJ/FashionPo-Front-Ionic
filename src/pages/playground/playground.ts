
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
  templateUrl: 'playground.html'
})

export class PlaygroundPage implements OnInit{
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
              public loadingCtrl: LoadingController)
  {

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
        targetHeight: 500,
        quality: 100,
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
      }, (err) => {
        console.log(err);
      });

  }

  ngOnInit(): void {

  }


}
