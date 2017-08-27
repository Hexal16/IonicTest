import { Injectable } from '@angular/core';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Events} from 'ionic-angular';
import * as _ from 'lodash';
@Injectable()
export class UserSettings {

    constructor(private storage: Storage, private events: Events) {

    }

    favouriteTeam(team, tournamentId, tournamentName) {
        let item = {team: team, tournamentId: tournamentId, tournamentName: tournamentName};
        this.storage.set(team.id, JSON.stringify(item));
        console.log('adding a fav', this.storage);
        console.log('Fav count', this.storage.length);
        this.events.publish('fav:changed');
    }

    unfavouriteTeam(team){
        this.storage.remove(team.id);
        this.events.publish('fav:changed');
    }

    isFavouriteTeam(team){
        return this.storage.get(team.id).then(value => value? true : false);
    }

    getAllFavourites(){
        console.log('getting all favs');
        return new Promise(resolve => {
            let results = [];
            this.storage.forEach(data => {
                results.push(JSON.parse(data));
            });
            console.log('the favs', results);
            return resolve(results);
            
        });
    }
}