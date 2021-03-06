import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { SignUpService } from './signup.service';
import { User } from './User';
import { Router } from '@angular/router';
import { userNamePasswordValidator } from './username-password.validator';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    
    public signupForm: FormGroup;

    @ViewChild('emailInput')
    public emailInput: ElementRef<HTMLInputElement>;
    
    constructor(
        private _formBuilder: FormBuilder,
        private _userNotTakenValidatorService: UserNotTakenValidatorService,
        private _signupService: SignUpService,
        private _router: Router
    ) { }
        
    ngOnInit(): void {

        this.signupForm = this._formBuilder.group({
            //para cada chave, um input no form
            email: ['', 
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            userName: ['', 
                [
                    Validators.required,
                    Validators.minLength(2),
                    lowerCaseValidator,
                    Validators.maxLength(40)
                ],
                //o terceiro parametro e para validadores asynchronous
                this._userNotTakenValidatorService.checkUserNameTaken() 
            ],
            fullName: ['', 
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ]
            ],
            password: ['', 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        },
        {
            validator: userNamePasswordValidator
        });
        //Set focus to the e-mail field
        this.emailInput.nativeElement.focus();
    }

    signup() {
        if(this.signupForm.valid && !this.signupForm.pending) {
            let user: User = this.signupForm.getRawValue();
            this._signupService.signup(user)
                .subscribe(
                    success => this._router.navigate(['']),
                    (error: any) => console.log("Error: ", error)
                );
        }
    }

}