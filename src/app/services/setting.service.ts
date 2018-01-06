import {Injectable} from '@angular/core';
import {Setting} from "../interfaces/setting";
import {AngularFireDatabase} from "angularfire2/database";
import {Globals} from "../statics/globals";
import * as firebase from "firebase";
import {FileItem} from "../interfaces/file-item";
import {Register} from "../interfaces/register";
import {Globals} from "../statics/globals";

@Injectable()
export class SettingService {

    constructor(private db: AngularFireDatabase) {
    }

  getRegisters() {
        return new Promise(resolve => {
            return this.db.list('registers').valueChanges().take(1).subscribe((snapshot: Register[]) => {
                resolve(snapshot);
            })
        })
    }

    updateRegisters(registers: Register[]) {
        for (let i in registers) {
            this.db.list('registers').update(registers[i].key.toString(), registers[i]);
        }
    }

    getMachineName(registerID: string) {
        return new Promise(resolve => {
            this.db.object('registers/' + registerID).update({getNameMachine: true});

            this.db.object('registers/' + registerID).valueChanges().subscribe((snapshot: Register) => {
                if (!snapshot.getNameMachine) {
                    resolve(snapshot.computerNameByPlugin);
                }
            })
        })
    }

    getLastRegisterID() {
        return new Promise(resolve => {
            this.db.object('registers/lastID').valueChanges().take(1).subscribe((snapshot: number) => {
                resolve(snapshot);
            })
        })
    }

    setRegister(registerNumber: number, computerName: string, key: string) {
        this.db.object('registers/' + key).update({
            registerNumber: registerNumber,
            computerName: computerName,
        })

        this.db.object('registers').update({lastID: registerNumber + 1})
    }

    deleteRegister(key: string) {
        this.db.object('registers/' + key).remove();
    }

    createDefaultRegister(key: string) {
        this.db.list('registers').set(key, {
            registerNumber: "",
            computerName: "",
            activeRegister: true,
            modifiedBy: Globals.userInfo.username,
            modificationDate: key,
            createdBy: Globals.userInfo.username,
            creationDate: key,
            key: key,
            getNameMachine: false,
            computerNameByPlugin: "",
        })
    }

    openRegister(){
        this.db.object('registers/'+Globals.userInfo.registerId.toString()).update({openRegister:true});
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
