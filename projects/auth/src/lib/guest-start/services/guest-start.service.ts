/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthConfig } from 'projects/auth/src/lib/auth.module';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class GuestStartService {
    public constructor(
        public authConfig: AuthConfig,
        private oAuthService: OAuthService,
    ) {}

    public oAuthLogin(user): void {
        if (!this.authConfig.afterOAuthLoginMethod) {
            throw(new Error('You must provide a login redirection method when importign AuthModule in your application'));
        }

        // Sending data and password for the token...
        this.oAuthService.fetchTokenUsingPasswordFlow(user.email, user.password)
            .then(
                (data: {[key: string]: any}) => {
                    this.authConfig.afterOAuthLoginMethod(data);
                }
            );
    }

    public register(form: FormGroup) {
        this.authConfig.registerUser(form);
    }
}
