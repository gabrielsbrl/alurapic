import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Injectable } from '@angular/core';

@Injectable() //permite que o servico seja injetavel
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private _tokenService: TokenService
    ) { }

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if(this._tokenService.hasToken()) {
            const token = this._tokenService.getToken();
            //Copia a requisicao adicionando o header com o token
            req = req.clone(
                {
                    setHeaders: {
                        'x-access-token': token
                    }
                }
            );
        }
        return next.handle(req); // forward on the requisition like a middleware
    }

}