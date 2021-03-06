import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorage {
    public db: SQLiteObject;

    constructor(private sqlLite : SQLite) {
        
     }
        
    getAll(){
        return this.db.executeSql('SELECT key, value FROM kv', []).then(data => {
            let results = [];
            for (let i = 0; i < data.rows.length; i++) {
                results.push(JSON.parse(data.rows.item(i).value));
            }
            return results;
        });
    }

    get(key: string){
        return this.db.executeSql('select key, value from kv where key = ? limit 1', [key]).then(data => {
            if (data.rows.length > 0) {
                return JSON.parse(data.rows.item(0).value);
            }
        });
    }

    remove(key: string){
        return this.db.executeSql('delete from kv where key = ?', [key]);
    }

    set(key: string, value: string){
        return this.db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]).then(data => {
            if (data.rows.length > 0) {
                return JSON.parse(data.rows.item(0).value);
            }
        });
    }
    
    /**
     * Should be called after deviceready event is fired
     */
    initializeDatabase(){

        // this.sqlLite.create({
        //     name: 'gdiData.db',
        //     location: 'default'
        //   })
        //     .then((db1: SQLiteObject) => {
        //         this.db = db1;          
        //     })
        //     .catch(e => console.log(e));


        //this.db = new SQLite();
        
        return this.sqlLite.create({ name: 'gdiData.db', location: 'default' }).then((db1) => {

            this.db = db1;
            return this.db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', []).then(data => {
                console.log('**after CREATE TABLE check', data);
            });
        });
    }
}