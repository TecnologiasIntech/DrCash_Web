export interface Transaction {
    userKey:string;
    dateRegistered?:number;
    comment?:string;
    type:number;
    amountCharged?:number;
    initial_Cash?:number;
    cash?:number;
    credit?:number;
    check?:number;
    checkNumber?:number;
    change?:number;
    patientFirstName?:string;
    copayment:boolean;
    selfPay:boolean;
    deductible:boolean;
    labs:boolean;
    other:boolean;
    otherComments:string;
    closed:boolean;
    registerId:string;
    modifiedById?:number;
    modificationDate?:number;
}

