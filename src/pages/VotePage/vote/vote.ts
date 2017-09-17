import {Component, ViewChild, ViewChildren, QueryList, OnInit} from '@angular/core';

import {
  NavController,
  NavParams,
  Platform,
  Content,
  ToastController,
  ModalController,
  App,
  ViewController,
  LoadingController
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {VoteWardrobePage} from './vote-wardrobe/vote-wardrobe';
import {TagPage} from "../../tag/tag";

import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent, Direction
} from 'angular2-swing';
import {HomePage} from "../../RankPage/home/home";
import {TabsPage} from "../../tabs/tabs";
import {FetchDataProvider} from "../../../providers/fetch-data/fetch-data";


@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html'
})

export class VotePage implements OnInit {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('myposts1') swingposts: QueryList<SwingCardComponent>;

  posts: Array<any>;
  nextPost: object;
  stackConfig: StackConfig;
  cachedPost: Array<object> = [];
  tabBarElement: any;
  overlayColor: string = 'transparent'; //Default Color
  user: any;
  noCard: boolean = false;
  noPost: boolean = false;
  noNextCard: boolean = false;
  @ViewChild(Content) content: Content;

  constructor(private http: Http,
              private storage: Storage,
              public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams,
              public fetchDatas: FetchDataProvider,
              private app: App,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,) {

  }

  ngOnInit(): void {
    let loading = this.loadingCtrl.create({showBackdrop: true, cssClass: 'loading', spinner: 'crescent'});
    loading.present();


    this.fetchDatas.getData('/post/random').then(data => {
      this.cachedPost = data.message;
      this.posts = [];
      this.nextPost = this.cachedPost.pop();
      this.addNewposts();
      loading.dismiss();
    }, err => {
      console.log(err);
      this.noPost = true;
      loading.dismiss();
    });


    this.stackConfig = {
      allowedDirections: [Direction.LEFT, Direction.RIGHT],

      throwOutConfidence: (offsetX, offsetY, element) => {
        const xConfidence = Math.min(Math.abs(offsetX) / (element.offsetWidth / 3), 1);
        return xConfidence;
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },

      throwOutDistance: (d) => {
        return 800;
      }
    };


  }

  addNewposts() {
    console.log('---add-----');
    console.log(this.posts[0]);
    // console.log(this.nextPost);
    // console.log(this.cachedPost);
    console.log('--------');
    if (this.nextPost === undefined) {
      this.noCard = true;
      console.log("no more cards")
    }
    else {

      this.posts.push(this.nextPost);
      console.log('@@@@@@@@@@@')
      console.log(this.posts[0]);
      console.log('@@@@@@@@@@@')

      this.fetchDatas.postData('/user', {users: [this.posts[0].writtenBy]}).then(data => {
        this.user = data[0];
      });
      if (this.cachedPost.length !== 0)
        this.nextPost = this.cachedPost.pop();
      else {
        // this.posts.push(this.nextPost);
        this.noNextCard = true;
        this.nextPost = undefined;
        console.log("no more nextCard");
        console.log(this.nextPost);
        console.log(this.posts);

      }
    }
  }

  parsingDate(date) {
    let month;
    let year;
    let day;
    //m d, y
    year = date.substring(0, 4);
    day = date.substring(8, 10);
    if (date.substring(5, 7) === '01') {
      month = 'Jan'
    }
    else if (date.substring(5, 7) === '02') {
      month = 'Feb'
    }
    else if (date.substring(5, 7) === '03') {
      month = 'Mar'
    }
    else if (date.substring(5, 7) === '04') {
      month = 'Apr'
    }
    else if (date.substring(5, 7) === '05') {
      month = 'May'
    }
    else if (date.substring(5, 7) === '06') {
      month = 'Jun'
    }
    else if (date.substring(5, 7) === '07') {
      month = 'Jul'
    }
    else if (date.substring(5, 7) === '08') {
      month = 'Aug'
    }
    else if (date.substring(5, 7) === '09') {
      month = 'Sep'
    }
    else if (date.substring(5, 7) === '10') {
      month = 'Oct'
    }
    else if (date.substring(5, 7) === '11') {
      month = 'Nov'
    }
    else if (date.substring(5, 7) === '12') {
      month = 'Dec'
    }
    return month + " " + day + ", " + year;
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
    this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
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

      event.target.style['-webkit-filter'] = `blur(20px)`;
      event.target.style['filter'] = `blur(10px)`;


    }

  }

  onItemMove(element, x, y, r) {
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

// Connected through HTML
  voteUp(like: boolean) {
    if (like) {
      console.log('----Check-------------');
      console.log(this.posts[0]);
      console.log('-----------------------')
      this.fetchDatas.postData('/post/fire',{post_id:this.posts[0]._id, writtenBy:this.posts[0].writtenBy}).then(data=>{
        console.log(data);
      });
      this.presentLikeToast()
    } else {
      this.fetchDatas.postData('/post/dislike',{post_id:this.posts[0]._id}).then(data=>{
        console.log(data);
      });
      this.presentSkipToast()
    }
    let removedCard = this.posts.pop();
    this.addNewposts();
    this.content.resize()

  }

  presentLikeToast() {
    let toast = this.toastCtrl.create({
      message: 'Liked!',
      duration: 200,
      position: 'middle',
      cssClass: 'like',
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentSkipToast() {
    let toast = this.toastCtrl.create({
      message: 'Skip!',
      duration: 200,
      position: 'middle',
      cssClass: 'skip',
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  presentWardrobeModal(user) {
    let profileModal = this.modalCtrl.create(VoteWardrobePage, {user_id: user}, {leaveAnimation: 'back'});
    profileModal.present();

  }

  goToTag(tagName) {
    console.log(tagName);
    let tagModal = this.modalCtrl.create(TagPage, {tagName: tagName});
    tagModal.present();

  }


}
