import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { LowerCasePipe } from '@angular/common';
import { MediaObserver } from '@angular/flex-layout';

// Services
import { GuestStartService } from '../services/guest-start.service';

import { CustomValidators } from 'ngx-jsonapi-material';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    public form = new FormGroup({});
    private custom_validators = new CustomValidators();

    public accepted_conditions: boolean = false;

    public haveCapitalLetter: boolean = false;
    public haveNumeric: boolean = false;
    public haveMinLength: boolean = false;

    public constructor(
        public mediaObserver: MediaObserver,
        public guestStartService: GuestStartService,
        protected formBuilder: FormBuilder,
        protected lowercase: LowerCasePipe,
        private changeDetectorRef: ChangeDetectorRef,
        protected router: Router
    ) {
        this.form = this.formBuilder.group({
            first_name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            last_name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required, 
                Validators.email, 
                Validators.pattern('[^ @]*@[^ @]*')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required, 
                Validators.minLength(8),
            ])),
            confirm_password: new FormControl('', Validators.compose([
                Validators.required, 
                Validators.minLength(8)
            ]))
        }, {
            validator: this.custom_validators.passwordMatchValidator
        })

        this.form.controls.password.valueChanges.subscribe((value) => {
            this.validatePassword();
            this.changeDetectorRef.detectChanges();
        })
    }

    public validateText(): string {
        if (this.form.controls.first_name.hasError('required') || this.form.controls.last_name.hasError('required')) {
          return 'Debes completar este campo';
        }
    }

    public validateEmail(): string {
        if (this.form.controls.email.hasError('required')) {
          return 'Debes completar este campo';
        }
        return this.form.controls.email.hasError('email') ? 'El correo no es válido' : '';
    }

    public validatePassword(): any {
        this.haveCapitalLetter = this.validateRegularExpressions('capitalLetter');
        this.haveNumeric = this.validateRegularExpressions('numeric');
    }
    
    public validateRegularExpressions(type: string) {
        let expression: any;
        switch (type) {
            case 'capitalLetter':
                expression = /[A-Z]/;
                break;
            case 'numeric':
                expression = /[0-9]/;
                break;
        }

        if(expression.exec(this.form.controls.password.value)) {
            return true;
        } else {
            return false;
        }
    }

    public registerUser(): void {
        if(this.form.status === 'INVALID'){
            return;
        } else {
            this.guestStartService.register(this.form);
        }
    }
}
