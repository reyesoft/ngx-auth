import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { LowerCasePipe } from '@angular/common';
import { MediaObserver } from '@angular/flex-layout';

// Services
import { GuestStartService } from '../services/guest-start.service';

import { CustomValidators } from 'ngx-jsonapi-material';
import { PassChipErrorComponent } from '../../pass-chip-error/pass-chip-error.component';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    public form = new FormGroup({});
    public onBlurChanges: boolean;
    private custom_validators = new CustomValidators();

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
                PassChipErrorComponent.passwordValidate,
            ])),
            confirm_password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ]))
        }, {
            validator: this.custom_validators.passwordMatchValidator
        });
    }

    public onBlur(): void {
        this.onBlurChanges = true;
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

    public registerUser(): void {
        if (this.form.status === 'INVALID') {
            return;
        } else {
            this.guestStartService.register(this.form);
        }
    }
}
