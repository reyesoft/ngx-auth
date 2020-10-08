/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { AuthConfig } from '../auth-config';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ForgotPasswordService {
    public constructor(
        protected http: HttpClient,
        @Inject('authConfig') public authConfig: AuthConfig
    ) {}

    public reset(query_parameters: {[key: string]: any}): Observable<any> {
        if (!this.authConfig.api || !this.authConfig.api.forgot_password_url.route) {
            return throwError(
                'You must provide "forgot_password_url" configuration when importing AuthModule in your application'
            );
        }

        let email = '';
        if (query_parameters.email.value) {
            email = query_parameters.email.value;
        }
        const body = new HttpParams().set('email', email);

        return this.http.post(
            this.authConfig.api.forgot_password_url.route,
            body.toString(),
            {
                headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')
            }
        );
    }
}
