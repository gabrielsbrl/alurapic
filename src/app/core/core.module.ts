import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { AlertModule } from '../shared/components/alert/alert.module';
import { LoadingModule } from '../shared/components/load/loading.module';

@NgModule({
    declarations: [ 
        HeaderComponent,
        FooterComponent
    ],
    exports: [ 
        HeaderComponent,
        FooterComponent
    ],
    imports: [ 
        CommonModule,
        RouterModule, // disponibiliza o routerLink
        AlertModule,
        LoadingModule
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