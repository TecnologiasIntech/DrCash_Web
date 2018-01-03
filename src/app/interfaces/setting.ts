export interface Setting {
    SMTPServer?:string;
    SMTPPort?:number;
    SMTPEmailFrom?:string;
    SMTPEmailBCC?:string;
    SMTPUsername?:string;
    SMTPPassword?:string;
    idleTime:number;
    leaveMoneyInRegister:boolean;
    sendPasswordThroughEmail:boolean;
    useDefaultPassword: boolean;
    defaultPassword:string;
    logoUrl: string;
}
