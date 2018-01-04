import {Injectable} from '@angular/core';

@Injectable()
export class RouteService {

    constructor() {
    }

    static getParameterByName(name: string) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.hash);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

    }

}
