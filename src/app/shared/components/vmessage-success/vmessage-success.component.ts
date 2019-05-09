import { Component, Input } from '@angular/core';

@Component({
    selector: 'ap-vmessage-success',
    templateUrl: './vmessage-success.component.html'
})
export class VMessageSuccessComponent {

    @Input()
    public condition: boolean;

}