/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Inject } from '@angular/core';
import { AuthConfig, AuthMethodsConfig } from '../auth-config';
import { ActivatedRoute, Router } from '@angular/router';

export interface IMessageModel {
    [property: string]: string;
}

@Component({
    selector: 'auth-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    public messageModel: IMessageModel;

    public constructor(
        @Inject('authConfig') public authConfig: AuthConfig,
        private authMethodsConfig: AuthMethodsConfig,
        private route: ActivatedRoute,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.route.data.subscribe((data): void => {
            this.messageModel = data.messageModel;
        });
        this.observerActivatedRoute();
    }

    private observerActivatedRoute(): void {
        this.activatedRoute.queryParams.subscribe((queryParams): void => {
            if (queryParams.key && queryParams.token && queryParams.key === 'activation_mail_ok') {
                this.setToken(queryParams.token);

                return;
            }

            this.setMessage(queryParams.message);
        });
    }

    private setMessage(message: string): void {
        if (!message) {
           return;
        }

        this.messageModel.message = message;
    }

    private setToken(token: string): void {
        localStorage.setItem('access_token', token); // Save the token in the local storage...
        this.authMethodsConfig.afterReceivingActivationToken(token);
        this.router.navigate([this.authConfig.routes.activation_email_redirect]);
    }

    public navigateTo(): void {
        this.router.navigate([this.messageModel.url_redirect]);
    }
}
