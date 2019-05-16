import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { TokenService } from '../token/token.service';
import { UserService } from 'src/app/user/user.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { }

  authenticate(userName: string, password: string) {

    return this._http
      .post(
        environment.apiUrl + '/user/login', 
        { userName, password }, 
        { observe: 'response'} 
      )
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this._userService.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`);
      }));
  }
}