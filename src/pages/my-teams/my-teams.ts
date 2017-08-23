import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TournamentsPage, TeamHomePage} from '../pages'
import { EliteApi} from '../../app/shared/shared'

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

  favourites = [
  {
    team: {id: 6182, name:"name", coach:"none"},
    tournamentId: '3dd50aaf-6b03-4497-b074-d81703f07ee8',
    tournamentName: 'Some tournament'
  },
  {
    team: {id: 805, name:"name2 2", coach:"none none none"},
    tournamentId: '46ebd526-8839-476a-9ba0-8a9b2c07f3c3',
    tournamentName: 'Some another tournament'
  }

  ]

  constructor(public navCtrl: NavController, private eliteApi:EliteApi) {

  }

  goToTournaments()
  {
    this.navCtrl.push(TournamentsPage)
  }

  favouriteTapped($event, item)
  {
    this.eliteApi.getTournamentData(item.tournamentId).subscribe(data => this.navCtrl.push(TeamHomePage, item.team));
  }
}
