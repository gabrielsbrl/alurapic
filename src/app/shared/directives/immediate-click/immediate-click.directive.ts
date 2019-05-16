import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Directive({
    selector: "[immediateClick]"
})
export class ImmediateClickDirective implements OnInit {

    constructor(
        private _element: ElementRef,
        private _platform: PlatformDetectorService
    ) { }

    ngOnInit(): void {
        this._platform.isPlatformBrowser && 
            this._element.nativeElement.click();
    }

}