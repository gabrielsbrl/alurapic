import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SignInComponent } from './signin/signin.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignupComponent } from './signup/signup.component';
import { VMessageSuccessModule } from '../shared/components/vmessage-success/vmessage-success.module';

@NgModule({
    declarations: [ 
        SignInComponent,
        SignupComponent 
    ],
    imports: [ 
        CommonModule, 
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        VMessageModule,
        HttpClientModule,
        VMessageSuccessModule
    ]
})
export class HomeModule { }