import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/User';
import { UserService } from 'src/app/user/user.service';

@Component({
    selector: 'ap-footer',
    templateUrl: './footer.component.html'
}) 
export class FooterComponent implements OnInit { 

    public user$ : Observable<User>;

    constructor(
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.user$ = this._userService.getUser();
    }

}