import { Injectable } from '@angular/core';
import { Http,Response, HttpModule } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {

    private baseUrl = 'https://elite-i2.firebaseio.com'; 
    currentTournament : any = {};
    private turneyData : any = {};
    constructor(private http: Http){

    }

    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getTournamentData(id, forceRefresh: boolean = false) : Observable<any> {

        if(!forceRefresh && this.turneyData[id]){
            this.currentTournament = this.turneyData[id];
            console.log("No need to make HTTP call, just return data");
            return Observable.of(this.currentTournament);
        }

        // dont have data yet
        console.log("Making HTTP call");
        return this.http.get(`${this.baseUrl}/tournaments-data/${id}.json`)
            .map((response: Response) => {
                this.turneyData[id] = response.json();
                this.currentTournament = this.turneyData[id];
                return this.currentTournament;
            })

        // return this.http.get(`${this.baseUrl}/tournaments-data/${id}.json`)
        //     .map((response: Response) => {
        //         this.currentTournament = response.json();
        //         return this.currentTournament;
        //     });
    }

    getCurrentTurney() {
        return this.currentTournament;
    }

    refreshTournament() {
        return this.getTournamentData(this.currentTournament.tournament.id, true);
    }
}