import { Component, Input } from '@angular/core';

const CLOUD = 'http://localhost:3000/imgs/'

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {
    
    private _url = '';

    @Input() 
    public description = '';
    
    //Inboud property pode passar o valor para um setter
    @Input() 
    set url(url: string) {
        //Caso a string url comece com data
        if(!url.startsWith('data')) {
            this._url = CLOUD + url;
        } else {
            this._url = url;
        }        
    };

    get url() {
        return this._url;
    }

}