import { Component, ViewChild,  } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import {LoadingController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MyTeamsPage, TournamentsPage, MapPage, JsmapPage, TeamHomePage } from '../pages/pages'
import { EliteApi, UserSettings } from './shared/shared'
import * as _ from 'lodash';

@Component({
  templateUrl: 'app.html',
  providers: [EliteApi, UserSettings]
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
              private events: Events
            ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavourites();
      this.events.subscribe('fav:changed',() => this.refreshFavourites());
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
  
  goToMap(){
      this.nav.push(MapPage);
  }
  
  goToJsmap(){
      this.nav.push(JsmapPage);
  }
}
