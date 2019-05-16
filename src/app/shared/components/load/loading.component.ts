import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { LoadingType } from './loading-type';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ap-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    public loading$: Observable<string>;

    constructor(
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        this.loading$ = this._loadingService
            .getLoading()
            .pipe(map(loadingType => loadingType.valueOf()));
    }

}