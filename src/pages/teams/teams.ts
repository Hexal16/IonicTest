import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    this.eliteApi.getTournamentData(this.navParams.data.id).subscribe(data => this.teams = data.teams);
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team)
  }

}
