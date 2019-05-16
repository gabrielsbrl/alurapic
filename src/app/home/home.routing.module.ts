import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginGuard } from '../core/auth/login.guard';
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { 
        //validate if the user is logged in to dont show this route content
        path: '',
        component: HomeComponent,
        canActivate: [ LoginGuard ],
        children: [ //Rotas dos componentes filhos deste
            {
                path: '',
                component: SignInComponent,
                data: {
                    title: 'Sign in'
                }
            },
            {
                path: 'signup',
                component: SignupComponent,
                data: {
                    title: 'Sign out'
                }
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