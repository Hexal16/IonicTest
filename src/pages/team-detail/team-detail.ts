import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GamePage } from '../../pages/pages'

import * as _ from 'lodash'
import { EliteApi } from '../../app/shared/shared'

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  games : any[];
  team : any;

  private tourneyData : any; 
  constructor(  
              public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi : EliteApi
            ) {
    console.log("navParams:", this.navParams);
  }

  ionViewDidLoad() {
    
    this.team = this.navParams.data;
    console.log('ionViewDidLoad TeamDetailPage  this.navParams.data',  this.navParams.data);
    this.tourneyData = this.eliteApi.getCurrentTurney();

    this.games = _.chain(this.tourneyData.games)
                .filter(g => g.team1Id == this.team.id ||
                             g.team2Id == this.team.id
                )
                .map(g => {
                  let isTeam1 = (g.team1Id == this.team.id);
                  let opponentName = isTeam1 ? g.team2 : g.team1;

                  let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                  return {
                    team1 : g.team1,
                    team2 : g.team2,
                    gameId: g.Id,
                    opponent: opponentName,
                    time: Date.parse(g.time),
                    location : g.location,
                    locationUrl: g.locationUrl,
                    scoreDisplay: scoreDisplay,
                    homeAway: (isTeam1 ? "vs." : "at")
                  }
                })
                .value();
  }

  getScoreDisplay(isTeam1, team1Score, team2Score)
  {
    if(team1Score && team2Score)
      {
        var teamScore = (isTeam1 ? team1Score : team2Score);
        var opponentScore = (isTeam1 ? team2Score :team1Score);

        var winIndicator = teamScore > opponentScore ? "W" : "L" ;
        return winIndicator + teamScore + "-" + opponentScore;
      }
      else{
        return "";
      }
  }

  gameClicked($event, g)
  {
    console.log("GAME : ", g)
    this.navCtrl.parent.parent.push(GamePage, g)
  }

}
