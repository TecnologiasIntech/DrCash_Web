import { Component, OnInit } from '@angular/core';
import {Transaction} from "../../interfaces/transaction";
import {USERTYPE} from "../../enums/enums";
import {Log} from "../../interfaces/log";
import {ValidationService} from "../../services/validation.service";
import {LogService} from "../../services/log.service";
import {Globals} from "../../statics/globals";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  constructor(private _logService: LogService) { }

  ngOnInit() {
  }

    logs: Log[] = [];
    username: string;
    dateFrom: any;
    dateTo: any;

    setLogs(){
        this._logService.setLog(this.username);
    }

    cleanFields(){
        this.username = null;
        this.dateFrom = null;
        this.dateTo = null;

        this.logs = [];
    }

    searchLogs(){
        this.validateDateFields();
        this.logs = [];
        if(Globals.userInfo.securityLevel == USERTYPE.ADMINISTRATOR){
            this._logService.searchAllLogs(this.username,this.dateFrom,this.dateTo)
                .then((response: Log[]) => {
                this.logs = response;
            })
        }else {
            this._logService.searchLogsByClinic(this.username,this.dateFrom,this.dateTo)
                .then((response: Log[]) => {
                    this.logs = response;
                })
        }

        console.log(logs);
    }

    validateDateFields() {
        if (!ValidationService.errorInField(this.dateFrom)) this.dateFrom = parseInt(this.dateFrom);
        if (!ValidationService.errorInField(this.dateTo)) this.dateTo = parseInt(this.dateTo);
    }
}



