import {Injectable} from '@angular/core';
import {
    AngularFireDatabase, DatabaseQuery, DatabaseReference,
    QueryFn
} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {userInfo} from "os";
import {Globals} from "../statics/globals";
import {DateService} from "./date.service";
import {ValidationService} from "./validation.service";
import 'rxjs/add/operator/take'
import {onChildAdded} from "angularfire2/database-deprecated";
import {reject} from "q";
import * as _ from "lodash";
import {Log} from "../interfaces/log";

@Injectable()
export class LogService {

    constructor(private db: AngularFireDatabase) {
    }

    setLog(message:string){
        let log:Log = {} as Log;
        log.dateTime = DateService.getCurrentDate().toString();
        log.username = Globals.userInfo.username;
        log.clinic = Globals.userInfo.clinic;
        log.actions = message;
        this.db.list('logs').update(log.dateTime+Globals.userInfo.userId.toString(), log);
    }

    getLog(procesBy: string) {
        return this.db.list("logs", ref => ref
            .orderByChild('procesBy')
            .equalTo(procesBy)).valueChanges()

    }

    searchAllLogs(procesBy: string, dateFrom: number, dateTo: number) {
        return new Promise((resolve, reject) => {
            if (!ValidationService.errorInField(procesBy)) {
                this.getLog(procesBy).take(1).subscribe((snapshot: Log[]) => {
                    if (snapshot.length > 0) {
                        resolve(snapshot)
                    } else {
                        let logs: any[] = [];
                        logs.push(snapshot);
                        resolve(logs);
                    }
                })
            } else if (!ValidationService.errorInField(dateFrom) && ValidationService.errorInField(dateTo)) {
                this.db.list('logs', ref => ref
                    .orderByChild('dateTime')
                    .startAt(dateFrom)
                ).valueChanges().take(1).subscribe((snapshot: Log[]) => {
                    let logs: Log[];
                    resolve(logs)
                })
            } else if (!ValidationService.errorInField(dateFrom) && !ValidationService.errorInField(dateTo)) {
                this.db.list('logs', ref => ref
                    .orderByChild('dateTime')
                    .startAt(dateFrom)
                    .endAt(dateTo)
                ).valueChanges().take(1).subscribe((snapshot: Log[]) => {
                    let logs: Log[];
                    resolve(logs)
                })
            }
        })
    }

    searchLogsByClinic(procesBy: string, dateFrom: number, dateTo: number) {
        return new Promise((resolve, reject) => {
            if (!ValidationService.errorInField(procesBy)) {
                this.getLog(procesBy).take(1).subscribe((snapshot: Log[]) => {
                    if (snapshot.length > 0) {
                        resolve(snapshot)
                    } else {
                        let logs: Log[] = this.filterLog(snapshot, Globals.userInfo.clinic);
                        resolve(logs);
                    }
                })
            } else if (!ValidationService.errorInField(dateFrom) && ValidationService.errorInField(dateTo)) {
                this.db.list('logs', ref => ref
                    .orderByChild('dateTime')
                    .startAt(dateFrom)
                ).valueChanges().take(1).subscribe((snapshot: Log[]) => {
                    let logs: Log[] = this.filterLog(snapshot, Globals.userInfo.clinic);
                    resolve(logs)
                })
            } else if (!ValidationService.errorInField(dateFrom) && !ValidationService.errorInField(dateTo)) {
                this.db.list('logs', ref => ref
                    .orderByChild('dateTime')
                    .startAt(dateFrom)
                    .endAt(dateTo)
                ).valueChanges().take(1).subscribe((snapshot: Log[]) => {
                    let logs: Log[] = this.filterLog(snapshot, Globals.userInfo.clinic);
                    resolve(logs)
                })
            }
        })
    }

    filterLog(logs: Log[], clinic: number) {
        if (!ValidationService.errorInField(clinic))
            logs = _.filter(logs, ['clinic', clinic]);

        return logs;
    }

}
