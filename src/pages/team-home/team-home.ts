import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StandingsPage,TeamDetailPage, MyTeamsPage} from '../pages'

/**
 * Generated class for the TeamHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  team : any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    
  }

  ionViewWillLoad()
  {
    console.log('ionViewWillLoad TeamHomePage');
    this.team = this.navParams.data;
  }
  ionViewDidLoad() {
    this.team = this.navParams.data; 
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome(){
      this.navCtrl.popToRoot();
  }

}
