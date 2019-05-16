import { Injectable, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';

import { Alert } from './Alert';
import { AlertType } from './Alert';

@Injectable({ providedIn: "root" })
export class AlertService implements OnInit {

    public alertSubject: Subject<Alert> = new Subject<Alert>();

    public keepAfterRouteChange = false;

    constructor(
        private _router: Router
    ) { }

    ngOnInit(): void {
       /*  this._router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                if(this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        }); */
    }

    success(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert() {
        return this.alertSubject.asObservable();
    }

    clear() {
        this.alertSubject.next(null);
    }

}