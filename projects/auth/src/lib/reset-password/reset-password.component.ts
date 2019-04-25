/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Router, UrlTree } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { GuestStartService } from '../guest-start/services/guest-start.service';
import { GlobalStateService } from '@shared/services/global-state.service';
import { CompaniesService } from '@shared/services/companies/companies.service';
import { RequestStatusService } from '@app/shared/services/request-status.service';
import { NgxNamedRoutesService } from 'ngx-named-routes';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
    public resetPassForm: FormGroup;
    public activation_code: string;
    public user_login: { email?: string; password?: string } = {};

    public constructor(
        public mediaQuery: ObservableMedia,
        protected resetPasswordService: ResetPasswordService,
        protected router: Router,
        protected globalStateService: GlobalStateService,
        protected requestStatusService: RequestStatusService,
        protected loginService: GuestStartService,
        protected ngxNamedRoutesService: NgxNamedRoutesService,
        protected companiesService: CompaniesService // protected store, Habilitar cuando se implemente Redux, ngrx store o alguna otra solución
    ) {}

    public ngOnInit() {
        this.resetPassForm = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
            repeatPassword: new FormControl('', [Validators.required]),
            activationCode: new FormControl()
        });
        let searchObject: UrlTree = this.router.parseUrl(this.router.url);
        // Pasamos el parametro obtenido por GET.
        this.resetPassForm.controls.activationCode.setValue(searchObject.queryParams.activation_code);
        this.user_login.email = searchObject.queryParams.email;

        this.requestStatusService.setForm(this.resetPassForm);
    }

    public sendResetPassword() {
        this.user_login.password = this.resetPassForm.controls.password.value;
        this.resetPasswordService.reset(this.resetPassForm.value).subscribe(res => {
            this.loginService.oAuthLogin(this.user_login).then(() => {
                this.router.navigate([this.ngxNamedRoutesService.getRoute('companies.select-company')]);
            });
        });
    }
}
