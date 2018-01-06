import { Component, OnInit } from '@angular/core';
import {Transaction} from "../../interfaces/transaction";
import {USERTYPE} from "../../enums/enums";
import {Log} from "../../interfaces/log";
import {ValidationService} from "../../services/validation.service";
import {LogService} from "../../services/log.service";
import {Globals} from "../../statics/globals";
import {DateService} from "../../services/date.service";
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  constructor(private _logService: LogService,
              public _dateService: DateService) { }

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
    }

    validateDateFields() {
        if (!ValidationService.errorInField(this.dateFrom)) {
            this.dateFrom = DateService.getInitialDateByDatePicker(this.dateFrom);
            this.dateFrom = parseInt(this.dateFrom);
        }
        if (!ValidationService.errorInField(this.dateTo)) {
            this.dateTo = DateService.getEndDateByDatePicker(this.dateTo);
            this.dateTo = parseInt(this.dateTo);
        }
    }

    printTransactionsTable(){
        let columns: string[] = ["Processed By", "Date", "Actiokn"];
        let rows = this._logService.convertLogsToPrintPDF(this.logs);
        let doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows,{
            styles: {cellPadding: 0.5, fontSize: 8}
        });
        doc.save('table.pdf');
    }
}



