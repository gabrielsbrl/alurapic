import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: "root" })
export class SignUpService {

    constructor(
        private _http: HttpClient
    ) { }

    checkUserNameTaken(userName: string) {
        return this._http.get(`${environment.apiUrl}/user/exists/${userName}`)
    }

    signup(user: User) {
        return this._http.post(`${environment.apiUrl}/user/signup`, user);
    }

}