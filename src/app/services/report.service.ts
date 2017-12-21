import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class ReportService {

    constructor(private db:AngularFireDatabase) {
    }

}
