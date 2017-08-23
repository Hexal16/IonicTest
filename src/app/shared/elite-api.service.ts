import { Injectable } from '@angular/core';
import { Http,Response, HttpModule } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {

    private baseUrl = 'https://elite-i2.firebaseio.com'; 
    currentTournament : any = {};
    constructor(private http: Http){

    }

    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getTournamentData(id) : Observable<any> {
        return this.http.get(`${this.baseUrl}/tournaments-data/${id}.json`)
            .map((response: Response) => {
                this.currentTournament = response.json();
                return this.currentTournament;
            });
    }
}