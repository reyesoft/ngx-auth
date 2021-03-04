// @mergeflag => este coponente no debe llegar a 21...
import {Component, Inject, Injectable} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MediaObserver } from '@angular/flex-layout';
import { GuestStartService } from '../services/guest-start.service';
import { LowerCasePipe } from '@angular/common';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';
import { User } from './user';
import { OAuthService } from 'angular-oauth2-oidc';

// ngx-formly
import { DynamicInput } from '../../dynamic-forms/dynamic-input';
import { login_form_model } from './login-form.model';
import {SocialButton} from '../social-buttons/social-button';
import {AuthConfig} from '../../auth-config';

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
    public social_buttons: Array<SocialButton> = [
        // { key: 'facebook', color: 'blue', svgIcon: 'facebook', text: 'Iniciar con Facebook' },
        // { key: 'google', color: 'blue', svgIcon: 'google', text: 'Iniciar con Google' }
    ];

    public constructor(
        public lowercase: LowerCasePipe,
        public guestStartService: GuestStartService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public oAuthService: OAuthService,
        @Inject('authConfig') public authConfig: AuthConfig,
        public mediaObserver: MediaObserver
    ) {
        if (activatedRoute.snapshot.queryParams.code) {
            this.guestStartService.loginWithAuthCode(activatedRoute.snapshot.queryParams.code);
        }
        this.searchParams = router.parseUrl(this.router.url);
        localStorage.removeItem('message');
        this.user.rememberme = false;
        this.fields = login_form_model;
        this.social_buttons = authConfig.social_buttons;
    }

    public socialLogin(provider: string) {
        this.guestStartService.socialLogin(provider, this.activatedRoute.snapshot.queryParams.continue || '');
    }

    public updateForm(change): void {
        this.user[change.target.type] = change.target.value;
    }

    public goLogin(): void {
        // Sending data and password for the token...
        if (this.form.status === 'VALID') {
            this.guestStartService.oAuthLogin(this.user);
        }
    }
}
