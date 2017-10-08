import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqlStorage } from './shared';

const win: any = window;

@Injectable()
export class UserSettings {
    //storage = new Storage(SqlStorage);
    public db: SQLite;
    public sql: SqlStorage;

    constructor(public events: Events, public storage: Storage) {

        if (win.sqlitePlugin) {
            // alert('Using SQLLite')
            this.sql = new SqlStorage(this.db);
        } else {
            // alert('Not using sqllite. Use local storage')
            console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
        }
    }

    favouriteTeam(team, tournamentId, tournamentName) {
        let item = {team: team, tournamentId: tournamentId, tournamentName: tournamentName};

        if (this.sql){
            this.sql.set(team.id.toString(), JSON.stringify(item)).then(data => {
                this.events.publish('fav:changed');
            });
        } else {
            this.storage.set(team.id, JSON.stringify(item));
            console.log('adding a fav', this.storage);
            console.log('Fav count', this.storage.length);
            this.events.publish('fav:changed');
        }
    }

    unfavouriteTeam(team) {
        if (this.sql){
            this.sql.remove(team.id.toString()).then(data => {
                this.events.publish('fav:changed');
            });
        } else {
            this.storage.remove(team.id);
            this.events.publish('fav:changed');
    
        }
    }

    isFavouriteTeam(team) {
        if (this.sql){
            console.log("CHECKING IN SQL")
            return this.sql.get(team.id.toString()).then(value => value ? true : false);
        } else {
            console.log("CHECKING IN .... somewhere else", team)
            return this.storage.get(team.id).then(value => value? true : false);
            // return new Promise(resolve => resolve(this.storage.get(teamId.toString()).then(value => value ? true : false)));
        }
    }

    getAllFavourites(){
        if (this.sql){
            return this.sql.getAll();
        } else {
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

    initStorage(){
        if (this.sql){
            alert('Using SQLite')
            return this.sql.initializeDatabase();
        } else {
            alert('Using local storage')
            return new Promise(resolve => resolve());
        }
    }
}