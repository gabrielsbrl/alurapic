import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { TokenService } from '../core/token/token.service';
import { User } from './User';

@Injectable({ providedIn: "root" })
export class UserService {

    /**
     * Subject -> emite o valor sem esperar por subscribe
     * BehaviorSubject -> emite o valor e aguarda ate que alguem faça subscrive
     */
    private _userSubject = new BehaviorSubject<User>(null);

    public userName: string;

    constructor(private _tokenService: TokenService) {
        this._tokenService.hasToken() && this._decodeAndNotify();
    }

    setToken(token: string) {
        this._tokenService.setToken(token);        
        this._decodeAndNotify();
    } 
    
    private _decodeAndNotify() {
        const token = this._tokenService.getToken();
        const user = jwt_decode(token) as User;
        //get user name
        this.userName = user.name;
        this._userSubject.next(user);
    }

    getUser() {
        return this._userSubject.asObservable();
    }
    
    logout() {
        this._tokenService.removeToken();
        this._userSubject.next(null);
    }

    /**
     * Return true if the user is logged in.
     * A validação e feita com base na existência de um token
     */
    isLogged() {
        return this._tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }

}