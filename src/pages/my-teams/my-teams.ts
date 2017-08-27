import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TournamentsPage, TeamHomePage} from '../pages'
import { EliteApi, UserSettings} from '../../app/shared/shared'

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

  favourites : any;

  constructor(  
            public navCtrl: NavController, 
            private eliteApi:EliteApi,
            private userSettings:UserSettings
          ) {

  }

  ionViewDidEnter()
  {
    this.userSettings.getAllFavourites().then(items => this.favourites = items);
  }

  goToTournaments()
  {
    this.navCtrl.push(TournamentsPage)
  }

  favouriteTapped($event, item)
  {
    console.log("favourite team data", item.team);
    this.eliteApi.getTournamentData(item.tournamentId).subscribe(data => this.navCtrl.push(TeamHomePage, item.team));
  }
}
