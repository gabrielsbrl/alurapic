import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

import { Photo } from '../../photo/photo';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/User';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input()
    public ownedPhoto: Photo;

    constructor(
        private _element: ElementRef<any>,
        private _renderer: Renderer,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this._userService
            .getUser()
            .subscribe(
                (user: User) => {
                    //caso nao encontre o usuario, ou nao estiver logado !user
                    if(!user || user.id != this.ownedPhoto.userId) {
                        this._renderer.setElementStyle(this._element.nativeElement, 'display', 'none');
                    }
                }
            )
    }

}