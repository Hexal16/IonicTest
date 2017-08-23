import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TournamentsPage} from '../pages'

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

  constructor(public navCtrl: NavController) {

  }

  goToTournaments()
  {
    this.navCtrl.push(TournamentsPage)
  }
}
