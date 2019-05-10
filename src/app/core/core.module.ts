import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';

@NgModule({
    declarations: [ HeaderComponent ],
    exports: [ HeaderComponent ],
    imports: [ 
        CommonModule,
        RouterModule // disponibiliza o routerLink
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, 
            useClass: RequestInterceptor, //Especifica o que quer prover
            multi: true // habilita mais de um interceptor
        }
    ]
})
export class CoreModule { }