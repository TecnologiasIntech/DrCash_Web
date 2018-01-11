import {Component, OnInit} from '@angular/core';
import {Register} from "../../interfaces/register";
import {SettingService} from "../../services/setting.service";
import {alertService} from "../../services/alert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewRegisterComponent} from "../../modals/new-register/new-register.component";
import {Globals} from "../../statics/globals";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registers: Register[] = [];
    registerNumber: number;
    computerName: string;
    activeRegister: boolean;
    registerId: number;
    registerKey: string;

    constructor(private _settingsService: SettingService,
                private _alertService: alertService,
                private _modal: NgbModal) {
        this.getRegisters();
    }

    ngOnInit() {

    }

    getRegisters() {
        this._settingsService.getRegisters()
            .then((response: Register[]) => {
                response.splice(response.length - 1, 1);
                this.registers = response;
                console.log(response)
            })
    }

    showRegister(register: Register, index: number) {
        this.registerNumber = register.registerNumber;
        this.computerName = register.computerName;
        this.activeRegister = register.activeRegister;
        this.registerId = index;
        this.registerKey = register.key;
    }

    editRegister() {
        this.registers[this.registerId].computerName = this.computerName;
        this.registers[this.registerId].activeRegister = this.activeRegister;
    }

    updateRegisters() {
        this._settingsService.updateRegisters(this.registers);

        this._alertService.success("Successfully Saved", "");
    }

    cancel() {
        this.getRegisters();
        this.registerNumber = null;
        this.computerName = null;
        this.activeRegister = null;
        this.registerId = null;
    }

    getComputerName() {
        this._settingsService.getMachineName()
            .then((response: string) => {
                this.computerName = response;
            })
    }

    openNewRegister() {
        this._modal.open(NewRegisterComponent, Globals.optionModalSm).result
            .then(() => {
                this.getRegisters();
            }, () => {
            })
    }
}
