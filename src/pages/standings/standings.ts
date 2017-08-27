import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../app/shared/shared'
import * as _ from 'lodash'

/**
 * Generated class for the StandingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  standings : any;
  team : any;
  allstandings : any[];
  constructor(
            public navCtrl: NavController, 
            public navParams: NavParams,
            private eliteApi : EliteApi) {
  }

  ionViewDidLoad() {
    console.log("LOADED STANDINGS VIEW");
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTurney();
    this.standings = tourneyData.standings;

    // this.allstandings =
    //   _.chain(this.standings)
    //    .groupBy('division')
    //    .toPairs()
    //    .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //    .value();

    console.log('standings:', this.standings); 
    this.allstandings = tourneyData.standings;

  }

  getHeader(record, recordIndex, records){
    if(recordIndex === 0 || record.division !== records[recordIndex - 1].division){
      return record.division;
    }

    return null;
  }


}
