
import {Component, ViewChild, ViewChildren, QueryList, OnInit} from '@angular/core';

import {NavController, NavParams, Platform, ToastController,App} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

import {
    StackConfig,
    Stack,
    Card,
    ThrowEvent,
    DragEvent,
    SwingStackComponent,
    SwingCardComponent
} from 'angular2-swing';
import {HomePage} from "../home/home";
import {TabsPage} from "../tabs/tabs";

@Component({
    selector: 'page-vote',
    templateUrl: 'vote.html'
})

export class VotePage implements OnInit{

  @ViewChild('myswing1') swingStack: SwingStackComponent;
    @ViewChildren('myposts1') swingposts: QueryList<SwingCardComponent>;

    posts: Array<any>;
    stackConfig: StackConfig;
    cachedPost: Array<object> = [];
    tabBarElement: any;

    constructor(private http: Http,
                private storage: Storage,
                public navCtrl: NavController,
                public platform: Platform,
                public navParams: NavParams,
                private app:App,
                public toastCtrl: ToastController) {

    }

  ngOnInit(): void {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.storage.get('token').then((val) => {
      var APIUrl = '/post/random';
      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://54.162.160.91/api/post/random';
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
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
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
          event.target.style.background = 'white';
        });

    }

    ionViewDidLoad() {

    }

    Rank() {
        this.navCtrl.setRoot(TabsPage, {}, {animate:true, direction:'forward'})
    }
    showToast(position: string, message: string) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: position
      });

      toast.present(toast);
    }
    blur(event) {
        if (event.target.style['-webkit-filter'] === `blur(10px)`) {
            event.target.style['-webkit-filter'] = `blur(0px)`;
            event.target.style['filter'] = `blur(0px)`;
        }
        else {
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
          this.showToast("bottom", "you liked this post");
        } else {
          this.showToast("bottom", "you passed this post");
        }
    }

// Add new posts to our array
    addNewposts() {
        this.posts.push(this.cachedPost.pop());
        console.log(this.cachedPost);
    }


}
