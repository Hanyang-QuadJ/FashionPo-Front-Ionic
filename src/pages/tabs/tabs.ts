import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
import { HomePage } from '../RankPage/home/home';
import {CameraPage} from "../CameraPage/Camera/Camera";
import { WardrobePage} from "../WardrobePage/Wardrobe/Wardrobe";

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CameraPage;
  tab3Root = WardrobePage;
  constructor() {

  }
}
