import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

import { UserService } from 'src/app/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    constructor(
        private _element: ElementRef<any>,
        private _renderer: Renderer,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        if(!this._userService.isLogged()) {
            console.log(`usuario deslogado`);
            this._renderer.setElementStyle(this._element.nativeElement, 'display', 'none');
        }
    }

}