import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User';

@Injectable({ providedIn: "root" })
export class SignUpService {

    private _api: string = 'http://localhost:3000';

    constructor(
        private _http: HttpClient
    ) { }

    checkUserNameTaken(userName: string) {
        return this._http.get(`${this._api}/user/exists/${userName}`)
    }

    signup(user: User) {
        return this._http.post(`${this._api}/user/signup`, user);
    }

}