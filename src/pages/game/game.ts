import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {EliteApi } from '../../app/shared//shared'

  import { TeamHomePage}from '../../pages/pages'

/**
 * Generated class for the GamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  game: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi : EliteApi) {
  }

  ionViewWillLoad(){
    this.game = this.navParams.data;

  }


  ionViewDidLoad() {
    
    console.log('ionViewDidLoad GamePage', this.game);
  }

  teamClicked(teamId)
  {
    let tourneyData = this.eliteApi.getCurrentTurney();
    let team = tourneyData.teams.find(t => t.teamId === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

}
