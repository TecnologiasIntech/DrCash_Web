import {Injectable} from '@angular/core';
import {Setting} from "../interfaces/setting";
import {AngularFireDatabase} from "angularfire2/database";
import {Globals} from "../statics/globals";

@Injectable()
export class SettingService {

    constructor(private db: AngularFireDatabase) {
    }

    setSettings(settings: Setting) {
        this.db.list('clinicas').update(Globals.userInfo.clinic + "/" + "Settings", settings);
        Globals.settings = settings;
    }

    getSettings() {
        return new Promise(resolve => {
            this.db.object('clinicas/' + Globals.userInfo.clinic + '/Settings')
                .valueChanges().take(1)
                .subscribe((snapshot: Setting) => {
                    resolve(snapshot);
                })
        })
    }

}
