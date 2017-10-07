import {IOSTransition} from "ionic-angular/transitions/transition-ios";

export class IosCustomTransitions extends IOSTransition{
	init(){
		if(this.opts.duration === undefined || this.opts.duration === 0){
			this.opts.duration = 250;

		}
		super.init();

	}
}