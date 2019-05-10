import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { 
        //validate if the user is logged in to dont show this route content
        path: '',
        component: HomeComponent,
        canActivate: [ AuthGuard ],
        children: [ //Rotas dos componentes filhos deste
            {
                path: '',
                component: SignInComponent
            },
            {
                path: 'signup',
                component: SignupComponent,
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule // Deve ser exportado para disponibilizar a configuracao
    ]
})
export class HomeRoutingModule { }