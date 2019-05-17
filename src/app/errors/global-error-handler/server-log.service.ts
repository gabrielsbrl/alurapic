import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerLog } from './server-log';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: "root" })
export class ServerLogService {

    constructor(
        private _http: HttpClient
    ) {}

    public log(serverLog: ServerLog) {
        return this._http.post<ServerLog>(`${environment.logUrl}/infra/log`, serverLog);
    }

}