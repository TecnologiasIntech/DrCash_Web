import {Injectable} from '@angular/core';
import {Setting} from "../interfaces/setting";
import {AngularFireDatabase} from "angularfire2/database";
import {Globals} from "../statics/globals";
import * as firebase from "firebase";
import {FileItem} from "../interfaces/file-item";

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

    setLogoUrl(url:string){
        this.db.object('clinicas/' + Globals.userInfo.clinic+'/Settings').update({
            logoUrl: url
        })
    }

    uploadLogo(file: FileItem) {
        return new Promise(resolve => {
            let storageRef = firebase.storage().ref('images/');
            let uploadTask: firebase.storage.UploadTask =
                storageRef.child(`clinic/${Globals.userInfo.clinic}/logo`).put(file.archivo);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => { },
                (error) => console.log("Error updating the image: " + error),
                () => {
                    file.url = uploadTask.snapshot.downloadURL;
                    this.setLogoUrl(file.url);
                    resolve(file.url);
                }
            )
        })
    }
}
