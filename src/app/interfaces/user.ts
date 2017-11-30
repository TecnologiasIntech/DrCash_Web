export interface User {
    username:string;
    firstName:string;
    lastName:string;
    password:string;
    securityQuestion:string;
    securityAnswer:string;
    email?:string;
    securityLevel:number;
    activeAccount:boolean;
    passwordReset:boolean;
    modifiedBy?:number;
    modificationDate?:string;
    createdBy:number;
    creationDate:string;
}
