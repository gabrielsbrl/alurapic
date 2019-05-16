import { Component, Input, OnInit } from '@angular/core';
import { Alert, AlertType } from './Alert';
import { AlertService } from './alert.service';

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

    @Input()
    public timeout = 3000;

    public alerts: Alert[] = [];

    public styleClass = "alert-box break-word text-center";

    constructor(
        private _alertService: AlertService
    ) { }

    ngOnInit(): void {
        this._alertService
            .getAlert()
            .subscribe(
                alert => {
                    if(!alert) {
                        this.alerts = [];
                        return;
                    }
                    this.alerts.push(alert);
                    setTimeout(() => this.removeAlert(alert), this.timeout)
                }
            );
    }

    removeAlert(alertToRemove: Alert) {
        //Mantem na lista apenas os alerts diferentes do buscado
        this.alerts = this.alerts.filter(alert => alert != alertToRemove);
    }

    getAlertClass(alert: Alert) {
        if(!alert) return '';
        
        switch(alert.alertType) {
            case AlertType.SUCCESS:
                return this.styleClass + ' alert alert-success';
            case AlertType.WARNING:
                return this.styleClass + ' alert alert-warning';
            case AlertType.DANGER:
                return this.styleClass + ' alert alert-danger';
            case AlertType.INFO:
                return this.styleClass + ' alert alert-info';
        }
    }

}