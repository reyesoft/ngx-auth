/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Injectable, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthConfig, AuthMethodsConfig } from '../../auth-config';
import { OAuthService } from 'angular-oauth2-oidc';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable()
export class GuestStartService {
    public constructor(
        private httpClient: HttpClient,
        private authMethodsConfig: AuthMethodsConfig,
        private oAuthService: OAuthService,
        @Inject('authConfig') public authConfig: AuthConfig
    ) {}

    public oAuthLogin(user): void {
        user.loading = true;
        if (!this.authMethodsConfig.afterOAuthLoginMethod) {
            throw(new Error('You must provide a login redirection method when importing AuthModule in your application'));
        }

        // Sending data and password for the token...
        this.oAuthService.fetchTokenUsingPasswordFlow(user.email, user.password)
            .then(
                (data: {[key: string]: any}) => {
                    this.authMethodsConfig.afterOAuthLoginMethod(data);
                    user.loading = false;
                }
            ).catch((error: Error) => {
                user.loading = false;
                throw(error);
            });
    }

    public loginWithAuthCode(code: string) {
        if (!this.authConfig.api || !this.authConfig.api.auth_code_login || !this.authConfig.api.auth_code_login.route) {
            return throwError(
                'You must provide "auth_code_login" configuration when importing AuthModule in your application'
            );
        }

        this.httpClient.post(this.authConfig.api.auth_code_login.route, {code: code})
            .subscribe(
                (data: {refresh_token: string; access_token: string}) => {
                    localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('access_token', data.access_token);
                    this.authMethodsConfig.afterOAuthLoginMethod(data);
                }
            );
    }

    public register(form: FormGroup) {
        this.authMethodsConfig.registerUser(form.value);
    }

    public socialLogin(provider: string, continue_url: string) {
        // similar behavior as an HTTP redirect
        window.location.replace(`${this.authConfig.api.social_login_url.route}/${provider}?continue=${continue_url}`);
    }

}
