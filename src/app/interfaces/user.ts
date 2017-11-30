export interface User {
    usr_ID:number;
    usr_Username:string;
    usr_FirstName:string;
    usr_LastName:string;
    usr_Password:string;
    usr_SecurityQuestion:string;
    usr_SecurityAnswer:string;
    usr_Email:string;
    usr_SecurityLevel:number;
    usr_ActiveAccount:boolean;
    usr_PasswordReset:boolean;
    usr_ModifiedBy:number;
    usr_ModificationDate:string;
    usr_CreatedBy:number;
    usr_CreationDate:string;
}
