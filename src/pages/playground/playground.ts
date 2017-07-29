import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers } from '@angular/http';
import 'rxjs/Rx';

import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

@Component({
  selector: 'page-playground',
  templateUrl: 'playground.html'
})

export class PlaygroundPage {


  constructor(private http: Http,private storage : Storage) {


  }


}
