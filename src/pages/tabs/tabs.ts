import {Component, ViewChild} from '@angular/core';
import {StatusBar} from "@ionic-native/status-bar";
import {Content, ModalController,NavController} from 'ionic-angular';


// import { AboutPage } from '../about/about';
import {HomePage} from '../RankPage/home/home';
import {CameraPage} from "../CameraPage/Camera/camera";
import {WardrobePage} from "../WardrobePage/wardrobe/wardrobe";
import {Camera} from '@ionic-native/camera';

@Component({
	templateUrl: 'tabs.html',
	selector: 'tabs'
})
export class TabsPage {
	@ViewChild(Content) content: Content;
	public base64Image: any = "";
	backButton: any = "";

	tags: any = [];
	allTags: any;
	comment: String;
	uploadCheck: boolean = false;

	public tagsInput: any;
	tab1Root = HomePage;
	tab2Root = CameraPage;
	tab3Root = WardrobePage;
	pictureTaken: boolean = false;

	constructor(public statusBar: StatusBar, public modal: ModalController, private camera: Camera, public navCtrl:NavController) {
		this.statusBar.styleDefault();
	}

}
