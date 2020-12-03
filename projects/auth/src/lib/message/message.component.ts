/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { GuestMessageComponent } from './guest-message/guest-message.component';

import { TranslateService } from '@ngx-translate/core';
import { AuthMethodsConfig } from '../auth-config';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})
export class MessageComponent {
    public key: string;
    public message: string;
    public messageType: string;
    public queryParams;

    public constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public mediaQuery: MediaObserver,
        private authMethodsConfig: AuthMethodsConfig,
    ) {
          activatedRoute.queryParams.subscribe(queryParams => (this.queryParams = queryParams));
          this.messageType = this.queryParams.type
          this.message = this.queryParams.message;

          if (this.queryParams.token) {
              this.authMethodsConfig.afterReceivingActivationToken(this.queryParams.token);
          }
    }
}
