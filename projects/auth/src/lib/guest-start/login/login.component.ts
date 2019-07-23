// @mergeflag => este coponente no debe llegar a 21...
import { Component, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MediaObserver } from '@angular/flex-layout';
import { GuestStartService } from '../services/guest-start.service';
import { LowerCasePipe } from '@angular/common';
import { Router, UrlTree } from '@angular/router';
import { User } from './user';
import { OAuthService } from 'angular-oauth2-oidc';

// ngx-formly
import { DynamicInput } from '../../dynamic-forms/dynamic-input';
import { login_form_model } from './login-form.model';

@Component({
    selector: 'auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent {
    public message = 'forgotpass';
    public searchParams: UrlTree;
    public user = new User();
    public getRoute: (args: any) => string;

    // ngx-formly
    public form = new FormGroup({});
    public model: { [key: string]: any } = {};
    public fields: Array<DynamicInput>;

    public constructor(
        public lowercase: LowerCasePipe,
        public guestStartService: GuestStartService,
        public router: Router,
        public oAuthService: OAuthService,
        public mediaObserver: MediaObserver
    ) {
        this.searchParams = router.parseUrl(this.router.url);
        localStorage.removeItem('message');
        this.user.rememberme = false;
        this.fields = login_form_model;
    }

    public updateForm(change): void {
        for (const key in this.model) {
            if (this.model.hasOwnProperty(key)) {
                this.user[key] = this.model[key];
            }
        }
    }

    public checkRememberme(event): void {
        this.user.rememberme = event.checked;
    }

    public goLogin(): void {
        this.user.rememberme = this.model.rememberme;
        // Sending data and password for the token...
        if (this.form.status === 'VALID') {
            this.guestStartService.oAuthLogin(this.user);
        }
    }
}
