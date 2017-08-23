import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages'

import * as _ from  'lodash';

import { EliteApi} from '../../app/shared/shared'

/**
 * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams :any;
  allTeams : any;
  allTeamDivisions: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi) {
    this.eliteApi.getTournamentData(this.navParams.data.id).subscribe(data => 
      {
        this.allTeams = data.teams;

        this.allTeamDivisions = 
        _.chain(data.teams)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
        .value();
        this.teams = this.allTeamDivisions;
        console.log("REAL DATA constructor", this.teams);
        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    this.eliteApi.getTournamentData(this.navParams.data.id).subscribe(data => 
        {
          this.allTeams = data.teams;

          this.allTeamDivisions = 
          _.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();
          console.log("REAL DATA", this.allTeamDivisions);
          this.teams = this.allTeamDivisions;
        });
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team)
  }

}
