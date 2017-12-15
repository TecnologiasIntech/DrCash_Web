export interface ClosedTransaction {
    bills_100:number;
    bills_50:number;
    bills_20:number;
    bills_10:number;
    bills_5:number;
    bills_1:number;
    checks_amount:number;
    credits_amount:number;
    total_charged:number;
    total_cash:number;
    total_check: number;
    total_credit:number;
    initial_cash:number;
    balance:number;
    transaction_count:number;
    reg_RegisterID:string;
    username:string;
    datetime:string;
}
