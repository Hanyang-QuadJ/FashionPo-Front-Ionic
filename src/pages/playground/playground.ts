
import {Component, ViewChild, ViewChildren, QueryList, OnInit} from '@angular/core';

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

export class PlaygroundPage implements OnInit{

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('myposts1') swingposts: QueryList<SwingCardComponent>;

  posts: Array<any>;
  stackConfig: StackConfig;
  cachedPost: Array<object> = [];

  constructor(private http: Http,
              private storage : Storage)
  {

  }
  ngOnInit(): void {

  }
  ngAfterViewInit() {


  }

}
