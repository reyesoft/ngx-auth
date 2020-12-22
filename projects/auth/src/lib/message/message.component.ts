/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Inject } from '@angular/core';
import { AuthConfig } from '../auth-config';
import { ActivatedRoute, Router } from '@angular/router';

export interface IMessageModel {
    [property:string]: string
}

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    public messageModel: IMessageModel;
    public constructor (
        @Inject('authConfig') public authConfig: AuthConfig,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.data.subscribe((data): void => {
            this.messageModel = data.messageModel;
        });
    }

    public navigateTo(): void {
        this.router.navigate([this.messageModel.url_redirect]);
    }
}
