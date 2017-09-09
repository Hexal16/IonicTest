import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
//import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

import {EliteApi } from '../../app/shared//shared'
declare var window: any;

@Component({
  templateUrl: 'team-map.html'
  //directives: [GOOGLE_MAPS_DIRECTIVES]
})
export class TeamMapPage {

  map: any;

  constructor(public navParams: NavParams, public eliteApi: EliteApi) {
    this.map = {
      lat: 0,
      lng: 0,
      zoom: 8,
      markerLabel: 'test' 
    };
  }

  ionViewDidLoad(){
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTurney();
    let location = tourneyData.locations[games.locationId];
console.log('games::::::::::::', games)
console.log('tourneyData::::::::::::', tourneyData)
console.log('location::::::::::::', location )

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location 
    };

  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

}
