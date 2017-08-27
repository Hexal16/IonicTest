import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {GamePage } from '../../pages/pages'

import * as _ from 'lodash';
import * as moment from 'moment';
import { EliteApi, UserSettings } from '../../app/shared/shared'

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  dateFilter : string;
  games : any[];
  allgames : any[];
  team : any;
  teamStandings : any;
  useDateFilter = false;
  IsFollowing = false;

  private tourneyData : any; 
  constructor(  
              public navCtrl: NavController,
              public alertController: AlertController, 
              public toastController: ToastController, 
              public navParams: NavParams,
              private eliteApi : EliteApi,
              private userSettings : UserSettings
            ) {
    console.log("navParams:", this.navParams);
  }

  ionViewWillLoad() {
    
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
                    3 : g.location,
                    locationUrl: g.locationUrl,
                    scoreDisplay: scoreDisplay,
                    homeAway: (isTeam1 ? "vs." : "at")
                  }
                })
                .value();
    this.allgames = this.games;
    this.teamStandings = _.find(this.tourneyData.standings, {'teamId':this.team.id});

    this.userSettings.isFavouriteTeam(this.team).then(value => this.IsFollowing = value);
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
    this.navCtrl.parent.parent.push(GamePage, g)
  }

  dateChanged(){

    if(!this.useDateFilter) {
      this.games = this.allgames;
      
    } else{
      this.games = _.filter(this.allgames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    }
    
  } 

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : 'NULL';
  }

  getScoreDisplayBadgeClass(g){

    return g.scoreDisplay.indexOf('W:') === 0  ? "badge-primary" : "badge-danger";
  }

  toggleFollow(){
    if(this.IsFollowing) {

      let confirm = this.alertController.create({
        title : "Unfollow?",
        message : "Are you sure, you want to unfollow?",
        buttons : [
          {
            text : "Yes",
            handler: () => {
              this.IsFollowing = false;
              this.userSettings.unfavouriteTeam(this.team);
              // TODO
              let toast = this.toastController.create({
                message : "You have unfollowed this team",
                duration : 2000,
                position : 'bottom'
              });

              toast.present();
            }
          },
          {
            text : "No"
          }
        ]
      });

      confirm.present();
    } else {
      this.IsFollowing  =true;
      this.userSettings.favouriteTeam(this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name);
      let toast = this.toastController.create({
        message : "You are now following this team",
        duration : 2000,
        position : 'bottom'
      });

      toast.present();
    }
  }

}
