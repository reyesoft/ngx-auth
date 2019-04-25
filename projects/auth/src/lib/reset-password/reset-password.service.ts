/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class ResetPasswordService {
    public constructor(protected http: HttpClient) {}

    public reset(resetPassword) {
        return this.http.post(
            environment.APIURL + 'users/password_reset_request',
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
