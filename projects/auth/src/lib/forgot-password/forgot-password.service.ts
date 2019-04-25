/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthConfig } from '../auth.module';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ForgotpassService {
    public constructor(
        protected http: HttpClient,
        @Inject('config') public authConfig: AuthConfig
    ) {}

    public reset(query_parameters: {[key: string]: any}): Observable<any> {
        if (!this.authConfig.api || !this.authConfig.api.reset_password_url.route) {
            return throwError(
                'You must provide "reset_password_url" configuration when importing AuthModule in your application'
            );
        }

        let body: string;

        for (const query_parameter in query_parameters) {
            if (query_parameters.hasOwnProperty(query_parameter)) {
                body = `${(body + '&' || '')}${query_parameter}=${query_parameters[query_parameter]}`;
            }
        }

        return this.http.post(
            this.authConfig.api.reset_password_url.route,
            body,
            {
                headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')
            }
        );
    }
}
