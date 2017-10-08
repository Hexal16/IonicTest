import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, Component} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpModule} from '@angular/http';
import {
    GoogleMaps
} from '@ionic-native/google-maps';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import {MyApp} from './app.component';
import {GamePage} from '../pages/game/game';
import {TeamDetailPage} from '../pages/team-detail/team-detail';
import {TournamentsPage} from '../pages/tournaments/tournaments';
import {MyTeamsPage} from '../pages/my-teams/my-teams';
import {TeamsPage} from '../pages/teams/teams';
import {StandingsPage} from '../pages/standings/standings';
import {TeamHomePage} from '../pages/team-home/team-home';
import {JsmapPage} from '../pages/jsmap/jsmap'; 
import {TeamMapPage} from '../pages/team-map/team-map'; 
import { AgmCoreModule } from 'angular2-google-maps/core';

import { BaseClass } from '../pages/pages'


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
        JsmapPage,
        TeamMapPage,
        BaseClass
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        IonicStorageModule.forRoot({
            name: '__mydb',
               driverOrder: ['indexeddb', 'sqlite', 'websql']
          }),
          AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM'})
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
        JsmapPage,
        TeamMapPage,
        BaseClass
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        GoogleMaps,
        Storage
    ]
})
export class AppModule {}
