import { Injectable } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot, // captura a rota atual
        state: RouterStateSnapshot // captura o estado atual da rota
    ): boolean | Observable<boolean> | Promise<boolean> {
        if(!this._userService.isLogged()) {
            this._router.navigate(
                [''],
                {
                    queryParams: {
                        fromUrl: state.url // captura a rota buscada pelo usuario, para mostra-la quando ele logar
                    }
                }
            );
            return false;
        }
        return true;
    }

}