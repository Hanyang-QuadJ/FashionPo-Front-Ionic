import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import {PlaygroundPage} from "../playground/playground";
import {RegisterPage} from "../register/register";

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
