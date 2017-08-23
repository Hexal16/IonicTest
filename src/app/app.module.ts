import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, Component} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpModule} from '@angular/http';
import {
    GoogleMaps
} from '@ionic-native/google-maps';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {GamePage} from '../pages/game/game';
import {TeamDetailPage} from '../pages/team-detail/team-detail';
import {TournamentsPage} from '../pages/tournaments/tournaments';
import {MyTeamsPage} from '../pages/my-teams/my-teams';
import {TeamsPage} from '../pages/teams/teams';
import {StandingsPage} from '../pages/standings/standings';
import {TeamHomePage} from '../pages/team-home/team-home';
import {MapPage} from '../pages/map/map';
import {JsmapPage} from '../pages/jsmap/jsmap';
// import { GamePage } from '../pages/game/game';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        MyTeamsPage,
        GamePage,
        TeamDetailPage,
        TournamentsPage,
        TeamsPage,
        StandingsPage,
        TeamHomePage,
        MapPage,
        JsmapPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        MyTeamsPage,
        GamePage,
        TeamDetailPage,
        TournamentsPage,
        TeamsPage,
        StandingsPage,
        TeamHomePage,
        MapPage,
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
