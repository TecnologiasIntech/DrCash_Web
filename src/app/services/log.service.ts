import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Log} from "../interfaces/log";
import {ValidationService} from "./validation.service";
import 'rxjs/add/operator/take'
import {
    AngularFireDatabase, DatabaseQuery, DatabaseReference,
    QueryFn
} from "angularfire2/database";

@Injectable()
export class LogService {

    constructor(private db: AngularFireDatabase) {
    }

    getlog(procesBy: string) {
        return this.db.list("logs", ref => ref
            .orderByChild('procesBy')
            .equalTo(procesBy).valueChanges())
    }

    searchLogs(procesBy: string, dateFrom: number, dateTo: number) {
        return new Promise((resolve, reject) => {
            if (!ValidationService.errorInField(procesBy)) {
                this.getlog(procesBy).take(1).subscribe((snapshot: Log) => {
                    let logs: Log[] = [];
                    logs.push(snapshot);
                    resolve(logs);
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

}
