import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LowerCasePipe } from '@angular/common';
import { MediaObserver } from '@angular/flex-layout';

// Services
import { GuestStartService } from '../services/guest-start.service';

// ngx-formly
import { signup_form } from './signup-form.model';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
    // ngx-formly
    public form = new FormGroup({});
    public model: { [key: string]: any } = {};
    public fields: Array<FormlyFieldConfig> = signup_form;

    protected user_login: { email?: string; password?: string } = {};

    public constructor(
        public mediaObserver: MediaObserver,
        protected guestStartService: GuestStartService,
        protected lowercase: LowerCasePipe,
        protected router: Router
    ) {}

    public registerUser(): void {
        this.guestStartService.register(this.form);
    }
}
