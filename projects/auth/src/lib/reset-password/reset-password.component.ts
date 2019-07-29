/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Router, UrlTree } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { GuestStartService } from '../guest-start/services/guest-start.service';

@Component({
    selector: 'auth-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public resetPassForm: FormGroup;
    public activation_code: string;
    public user_login: { email?: string; password?: string } = {};

    public constructor(
        public mediaObserver: MediaObserver,
        public resetPasswordService: ResetPasswordService,
        public router: Router,
        public guestStartService: GuestStartService,
    ) {}

    public ngOnInit() {
        this.resetPassForm = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
            repeatPassword: new FormControl('', [Validators.required]),
            activationCode: new FormControl()
        });
        const searchObject: UrlTree = this.router.parseUrl(this.router.url);
        // Pasamos el parametro obtenido por GET.
        this.resetPassForm.controls.activationCode.setValue(searchObject.queryParams.activation_code);
        this.user_login.email = searchObject.queryParams.email;
    }

    public sendResetPassword() {
        this.user_login.password = this.resetPassForm.controls.password.value;
        this.resetPasswordService.reset(this.resetPassForm.value).subscribe(res => {
            this.guestStartService.oAuthLogin(this.user_login);
        });
    }
}
