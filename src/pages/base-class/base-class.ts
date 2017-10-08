import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the BaseClassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-base-class',
  templateUrl: 'base-class.html',
})
export class BaseClass {

  isApp = false;
  isMobileWeb = false;
  constructor(public platform : Platform){
      if(this.platform.is('core') || this.platform.is('mobileweb')) {
          this.isApp = false;
        } else {
          this.isApp = true;
        }
        this.isMobileWeb = this.platform.is('mobileweb')
        //alert('Current platform is app (BaseClass): or is mobileweb ' + this.isApp + ', ' + this.isMobileWeb );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BaseClassPage');
  }

}
