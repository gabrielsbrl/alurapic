import { Component, Input } from '@angular/core';

@Component({
    selector: 'ap-vmessage',
    templateUrl: './vmessage.component.html'
})
export class VMessageComponent { 

    //Recebe a condicao via inboud property
    @Input()
    public condition: boolean;
}