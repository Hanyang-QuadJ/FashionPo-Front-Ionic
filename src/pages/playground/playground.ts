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
    this.storage.get('token').then((val) => {
      var APIUrl = '/post/random';
      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://54.162.160.91/api/rank';
      //   // console.log('yes');
      // }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);


      this.http.get(APIUrl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.cachedPost = data.message;
          console.log(this.cachedPost);
          this.posts = [];
          this.addNewposts();
        });
    });

    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }
  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });



  }

  blur(event){
    if(event.target.style['-webkit-filter'] === `blur(10px)`){
      event.target.style['-webkit-filter'] = `blur(0px)`;
      event.target.style['filter'] = `blur(0px)`;
    }
    else{
      event.target.style['-webkit-filter'] = `blur(10px)`;
      event.target.style['filter'] = `blur(10px)`;
    }

  }

  onItemMove(element, x, y, r) {
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

// Connected through HTML
  voteUp(like: boolean) {
    let removedCard = this.posts.pop();
    this.addNewposts();
    if (like) {

    } else {

    }
  }

// Add new posts to our array
  addNewposts() {
    this.posts.push(this.cachedPost.pop());
    console.log(this.cachedPost);

  }


}
