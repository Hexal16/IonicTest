import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {EliteApi } from '../../app/shared//shared'

import { TeamHomePage, TeamMapPage}from '../../pages/pages'

declare var window:any;
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
    this.game.gameTime = Date.parse(this.game.time)
    console.log("GAME passed to the game page", this.game);
  }


  ionViewDidLoad() {
    
    console.log('ionViewDidLoad GamePage', this.game);
  }

  TeamTapped(teamId)
  {
    let tourneyData = this.eliteApi.getCurrentTurney();
    let team = tourneyData.teams.find(t => t.teamId === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }
  
  isWinner(score1, score2){
    return Number(score1) > Number(score2);
  }

  goToMap() {
    this.navCtrl.push(TeamMapPage, this.game);
  }

  goToDirections(){
    let tourneyData = this.eliteApi.getCurrentTurney();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude}, ${location.longitude};u=35;`
  }

}
