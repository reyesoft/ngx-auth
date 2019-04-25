/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthConfig } from '../auth-config';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ResetPasswordService {
    public constructor(
        protected http: HttpClient,
        @Inject('authConfig') public authConfig: AuthConfig
    ) {}

    public reset(resetPassword: {password: string; repeatPassword: string; activationCode: string}): Observable<any> {
        if (!this.authConfig.api || !this.authConfig.api.reset_password_url.route) {
            return throwError(
                'You must provide "reset_password_url" configuration when importing AuthModule in your application'
            );
        }

        return this.http.post(
            this.authConfig.api.reset_password_url.route,
            'password=' +
                resetPassword.password +
                '&repeat_password=' +
                resetPassword.repeatPassword +
                '&activation_code=' +
                resetPassword.activationCode,
            {
                headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')
            }
        );
    }
}
