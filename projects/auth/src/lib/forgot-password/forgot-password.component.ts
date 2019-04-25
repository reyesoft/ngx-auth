/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgotpassService } from './forgot-password.service';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
    public user = { email: '' };
    public forgotPassForm: FormGroup;
    public getRoute: (args: any) => string;

    protected alerts = [];

    public constructor(
        public ngZone: NgZone,
        protected forgotpassService: ForgotpassService,
        private router: Router,
        public mediaObserver: MediaObserver
    ) {}

    public ngOnInit() {
        this.forgotPassForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')])
        });
    }

    public cancel() {
        this.router.navigate(
            [this.forgotpassService.authConfig.routes.login.route],
            {queryParams: this.forgotpassService.authConfig.routes.login.query_params}
        );
    }

    public sendEmail() {
        this.forgotpassService.reset(this.forgotPassForm.controls.email.value).subscribe(res => {
            this.ngZone.run(
                () => this.router.navigate(
                    [this.forgotpassService.authConfig.routes.forgot_password_redirection.route],
                    {queryParams: this.forgotpassService.authConfig.routes.forgot_password_redirection.query_params}
                )
            );
        });
    }
}
