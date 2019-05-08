import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public user$: Observable<User>; //sempre que tiver um observable, e interessante marcar com $

    constructor(
        private _userService: UserService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.user$ = this._userService.getUser();
    }

    logout() {
        this._userService.logout();
        this._router.navigate(['']);
    }

}