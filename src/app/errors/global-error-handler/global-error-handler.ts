import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTrace from 'stacktrace-js';
import { Router } from '@angular/router';

import { UserService } from 'src/app/user/user.service';
import { ServerLogService } from './server-log.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(
        private _injector: Injector
    ) {}

    handleError(error: any): void {

        const location = this._injector.get(LocationStrategy);

        const userService = this._injector.get(UserService);

        const serverLogService = this._injector.get(ServerLogService);

        const errorAlert = this._injector.get(AlertService);

        const router = this._injector.get(Router);

        const url = location instanceof PathLocationStrategy ? location.path() : '';
        
        const message = error.message ? error.message : error.toString();

        StackTrace
            .fromError(error)
            .then(stackFrames => {
                
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');

                errorAlert.danger(message);

                serverLogService
                    .log({
                        message,
                        url,
                        userName: userService.getUserName(),
                        stack: stackAsString
                    })
                    .subscribe(
                        () => {
                            console.log('Error sended!');
                            if(environment.production) {
                                router.navigate(['error']);
                            }
                        },
                        err => {
                            console.log('An error occur while posting it to the server.\n', err);
                            if(environment.production) {
                                router.navigate(['error']);
                            }
                        }
                    );

            })
    }

}