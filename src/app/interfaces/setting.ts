export interface Setting {
    ID:number;
    SMTPServer:string;
    SMTPPort:number;
    SMTPEmailFrom:string;
    SMTPEmailBCC:string;
    SMTPUsername:string;
    SMTPPassword:string;
    LockAutomatically:boolean;
    TimeOutLock:number;
    RefreshSummary:boolean;
    TimeRefreshSummary:number;
    Logo:string;
    ResetPasswordEmail:boolean;
    DefaultPassword:boolean;
    DefaultPasswordValue:string;
    LeaveMoneyInRegister:boolean;
}
