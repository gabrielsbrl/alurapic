import { AbstractControl } from '@angular/forms';

//Todo validator deve receber um abstract control
//O abstract control e responsavel por controlar o form
export function lowerCaseValidator(control: AbstractControl) {

    let validationPattern = /^[a-z0-9_\-]+$/;
    //control.value -> acessa a propriedade que se deseja validar
    if(control.value.trim() && !validationPattern.test(control.value)) {
        //Se houver erro na validacao
        return { lowerCase: true }; // prop para ser usada no template em caso de erro
    }

    return false; // caso nao haja erro 
}