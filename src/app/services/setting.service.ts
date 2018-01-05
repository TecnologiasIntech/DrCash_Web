import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
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

    getMachineName(key: string) {
        return new Promise(resolve => {
            this.db.object('registers/' + key).update({getNameMachine: true});

            this.db.object('registers/' + key).valueChanges().subscribe((snapshot: Register) => {
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
        this.db.object('registers/'+Globals.userInfo.registerId.toString()+"/openRegister").update(true);
    }

}
