import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
import { HomePage } from '../RankPage/home/home';
import {PlaygroundPage} from "../CameraPage/playground/playground";
import {RegisterPage} from "../WardrobePage/register/register";

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlaygroundPage;
  tab3Root = RegisterPage;
  constructor() {

  }
}
