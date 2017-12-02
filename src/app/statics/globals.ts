import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";

@Injectable()
export class Globals{
    username: string = "carlos";
    userInfo: User;
}