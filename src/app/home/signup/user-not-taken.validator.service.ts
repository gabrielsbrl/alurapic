import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators'

import { SignUpService } from './signup.service';

@Injectable({ providedIn: "root" })
export class UserNotTakenValidatorService {

    constructor(
        private _signUpService: SignUpService
    ) { }

    checkUserNameTaken() {
        return (control: AbstractControl) => {    
            return control //Retorna um observable que aguarda pela validacao especificada
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName => this._signUpService.checkUserNameTaken(userName)))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(first()); //forca a emissao do primeiro valor encontrado
                                //Caso contrario nuna retornara o valor
        }
    }

}