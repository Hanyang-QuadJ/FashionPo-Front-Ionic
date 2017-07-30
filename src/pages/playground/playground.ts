
import {Component, ViewChild, ViewChildren, QueryList, OnInit} from '@angular/core';

import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-playground',
  templateUrl: 'playground.html'
})

export class PlaygroundPage implements OnInit{

  constructor(private http: Http,
              private storage : Storage,
              private camera: Camera)
  {

  }

  ngOnInit(): void {

  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
