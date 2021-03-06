export interface Register {
    registerNumber:number;
    computerName:string;
    activeRegister:boolean;
    modifiedBy?:string;
    modificationDate?:string;
    createdBy:string;
    creationDate:string;
    key:string,
    getNameMachine:boolean;
    computerNameByPlugin:string;
}
