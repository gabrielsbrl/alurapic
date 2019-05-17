import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { PhotoComment } from '../photo/PhotoComment';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/user/user.service';

@Component({
    selector: 'ap-photo-details',
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

    public photo$: Observable<Photo>;
    public photoId: number;

    constructor(
        private _route: ActivatedRoute,
        private _photoService: PhotoService,
        private _router: Router,
        public alertService: AlertService,
        private _userService: UserService
    ) {}    

    ngOnInit(): void {
        //use snapshot para capturar o estado atual da rota
        //take a picture of the actual state of the route
        this.photoId = this._route.snapshot.params.photoId;
        this.photo$ = this._photoService.findById(this.photoId);
        //subscribe apenas para tratamento de erro caso a foto buscada nao seja encontrada
        this.photo$
            .subscribe(
                () => {},
                err => this._router.navigate(['not-found'])
            );
    }

    remove() {
        this._photoService
            .removePhoto(this.photoId)
            .subscribe(
                () => {
                    this.alertService.success('Photo removed', false);
                    /**
                     * Replace url garante que caso o usuário de um back no navegador
                     * que ele nao consiga acessar a rota que expoe os detalhes da foto,
                     * ja que a foto nao existe mais e nao faz sentido voltar para ela,
                     * ele basicamente exclui a rota do historico de navegação
                     */
                    this._router.navigate(['/user', this._userService.getUserName()], { replaceUrl: true })
                },
                err => {
                    console.log(err);
                    this.alertService.danger('An error occur, and the photo coudn`t be removed')
                }
            );
    }

    like(photo: Photo) {
        this._photoService
            .like(photo.id)
            .subscribe(liked => {
                if(liked) {
                    this.photo$ = this._photoService.findById(photo.id);
                }
            })
    }

}