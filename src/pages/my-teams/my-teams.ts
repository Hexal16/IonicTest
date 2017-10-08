import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TournamentsPage, TeamHomePage, BaseClass} from '../pages'
import { EliteApi, UserSettings} from '../../app/shared/shared'
import { Platform } from 'ionic-angular';

import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage extends BaseClass  {

  favourites : any;

  constructor(  
            public navCtrl: NavController, 
            private eliteApi:EliteApi,
            private userSettings:UserSettings,
            public platform : Platform,
            private deeplinks: Deeplinks
          ) { super(platform);}

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
