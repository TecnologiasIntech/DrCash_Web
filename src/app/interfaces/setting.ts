export interface Setting {
    SMTPServer?:string;
    SMTPPort?:number;
    SMTPEmailFrom?:string;
    SMTPEmailBCC?:string;
    SMTPUsername?:string;
    SMTPPassword?:string;
    lockAutomatically:boolean;
    timeOutLock?:number;
    refreshSummary:boolean;
    timeRefreshSummary?:number;
    logo?:string;
    resetPasswordEmail:boolean;
    defaultPassword?:boolean;
    defaultPasswordValue?:string;
    leaveMoneyInRegister?:boolean;
}
