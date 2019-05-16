import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LoadingService } from './loading.service';

/**
 * Remember: 
 * interceptor is a type of service.
 * to be an interceptor, need to implement HttpInterceptor 
 */
@Injectable({ providedIn: "root" })
export class LoadingInterceptor implements HttpInterceptor {
    
    constructor(
        private _loadingService: LoadingService
    ) {}
        
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //pode ser entendido como um "middleware" node-like
        return next
            .handle(req)
            .pipe(tap(event => {
                if(event instanceof HttpResponse) {
                    this._loadingService.stop();
                } else {
                    this._loadingService.start();
                }
            }));
    }
    

}