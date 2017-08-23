import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google

/**
 * Generated class for the JsmapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jsmap',
  templateUrl: 'jsmap.html',
})
export class JsmapPage {
    
    @ViewChild('map') mapElement;
    map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JsmapPage');
    this.initMap();
  }
  
  initMap(){
      let latLng = new google.maps.LatLng(1.0,1.0);
      let mapOptions ={
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
