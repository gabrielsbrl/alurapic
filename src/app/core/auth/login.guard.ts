import { Injectable } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class LoginGuard implements CanActivate {
    
    constructor(
        private _userService: UserService,
        private _router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot, // captura a rota atual
        state: RouterStateSnapshot // captura o estado atual da rota
    ): boolean | Observable<boolean> | Promise<boolean> {
        if(this._userService.isLogged()) {
            this._router.navigate(['user', this._userService.getUserName()]);
            return false;
        }
        return true;
    }

}