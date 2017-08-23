import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MyTeamsPage, TournamentsPage, MapPage, JsmapPage } from '../pages/pages'
import { EliteApi } from './shared/shared'

@Component({
  templateUrl: 'app.html',
  providers: [EliteApi]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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
