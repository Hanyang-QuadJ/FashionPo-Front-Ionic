import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import {Storage} from '@ionic/storage';
import {Platform} from 'ionic-angular';

import 'rxjs/add/operator/map';

/*
  Generated class for the FetchDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FetchDataProvider {

  constructor(public http: Http,
              public storage: Storage,
              public platform: Platform,
              ) {
    console.log('Hello FetchDataProvider Provider');
  }
  testProvider(){
    console.log('providerCheck');
  }
  public getData(type){
    this.storage.get('token').then((val) => {
      let APIUrl = type;
      // if (this.platform.is('ios') == true){
      //   APIUrl = 'http://fashionpo-loadbalancer-785809256.us-east-1.elb.amazonaws.com/api'+type;
      //   // // console.log('yes');
      // }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', val);
      const p = new Promise((resolve, reject) => {
        this.http.get(APIUrl, {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            resolve(data)

          });
        return p;

      });

    })

  }
}

