import { Component, ViewChild,  } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import {LoadingController } from 'ionic-angular';

import { MyTeamsPage, TournamentsPage, JsmapPage, TeamHomePage, StandingsPage, GamePage } from '../pages/pages'
import { EliteApi, UserSettings } from './shared/shared'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Deeplinks } from '@ionic-native/deeplinks';
@Component({
  templateUrl: 'app.html',
  providers: [EliteApi, UserSettings, Deeplinks]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favouriteTeams : any;
  rootPage: any = MyTeamsPage;

  constructor(
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private userSettings: UserSettings,
              private loadingController: LoadingController,
              private eliteApi: EliteApi,
              private events: Events,
              private deeplinks : Deeplinks
            ) {
    this.initializeApp();
    deeplinks.route({
      '/myTeam': MyTeamsPage,
      '/tournaments': TournamentsPage,
      '/standings': StandingsPage,
      '/game': GamePage,
    }).subscribe((match) => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      console.log('!!!!!!!!!!!!!!1Successfully matched route', match);
    }, (nomatch) => {
      // nomatch.$link - the full link data
      console.error('!!!!!!!!!!!!!!!!Got a deeplink that didn\'t match', nomatch);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavourites();
      this.events.subscribe('fav:changed',() => this.refreshFavourites());

      this.deeplinks.routeWithNavController(this.nav, {
        '/myTeam': MyTeamsPage,
        '/tournaments': TournamentsPage,
        '/standings': StandingsPage,
        '/game': GamePage,
      }).subscribe((match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log('Successfully matched route', match);
        }, (nomatch) => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', nomatch);
        });
    });
  }

  refreshFavourites(){
    console.log('REFRESHINREFRESHIN REFRESHIN REFRESHIN REFRESHIN REFRESHIN');
     this.userSettings.getAllFavourites().then(items => this.favouriteTeams = items);
  }

  goToTeam(team)
  {
    let loader = this.loadingController.create({
      content: 'Loading',
      dismissOnPageChange : true
    });

    loader.present();
    this.eliteApi.getTournamentData(team.tournamentId).subscribe(l => {
      this.nav.push(TeamHomePage, team.team  )});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome(){
      this.nav.push(MyTeamsPage)
  }

  goToTournaments(){
    this.nav.push(TournamentsPage)
  }
    
  goToJsmap(){
      this.nav.push(JsmapPage);
  }
}
