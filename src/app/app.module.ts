import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, Component} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpModule} from '@angular/http';
import {
    GoogleMaps
} from '@ionic-native/google-maps';

import {MyApp} from './app.component';
import {GamePage} from '../pages/game/game';
import {TeamDetailPage} from '../pages/team-detail/team-detail';
import {TournamentsPage} from '../pages/tournaments/tournaments';
import {MyTeamsPage} from '../pages/my-teams/my-teams';
import {TeamsPage} from '../pages/teams/teams';
import {StandingsPage} from '../pages/standings/standings';
import {TeamHomePage} from '../pages/team-home/team-home';
import {JsmapPage} from '../pages/jsmap/jsmap';
// import { GamePage } from '../pages/game/game';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
    declarations: [
        MyApp,
        MyTeamsPage,
        GamePage,
        TeamDetailPage,
        TournamentsPage,
        TeamsPage,
        StandingsPage,
        TeamHomePage,
        JsmapPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        IonicStorageModule.forRoot({
            name: '__mydb',
               driverOrder: ['indexeddb', 'sqlite', 'websql']
          })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MyTeamsPage,
        GamePage,
        TeamDetailPage,
        TournamentsPage,
        TeamsPage,
        StandingsPage,
        TeamHomePage,
        JsmapPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        GoogleMaps
    ]
})
export class AppModule {}
