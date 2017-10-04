import { Component, ViewChild} from '@angular/core';
import {StatusBar} from "@ionic-native/status-bar";
import {Content} from 'ionic-angular';



// import { AboutPage } from '../about/about';
import { HomePage } from '../RankPage/home/home';
import {CameraPage} from "../CameraPage/Camera/camera";
import { WardrobePage} from "../WardrobePage/wardrobe/wardrobe";

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs'
})
export class TabsPage {
  @ViewChild(Content) content: Content;

  tab1Root = HomePage;
  tab2Root = CameraPage;
  tab3Root = WardrobePage;
  constructor(public statusBar: StatusBar) {
    this.statusBar.styleDefault();
  }
  test(){
  	console.log("test");
  }



}
