import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import { AuthorizationModule } from './authorization.module';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '../auth.module';

describe('AuthorizationComponent', () => {
    let component: AuthorizationComponent;
    let fixture: ComponentFixture<AuthorizationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AuthorizationModule,
                HttpClientTestingModule,
                RouterTestingModule,
                OAuthModule.forRoot({
                    resourceServer: {
                        allowedUrls: [''],
                        sendAccessToken: true
                    }
                }),
                AuthModule.forRoot({
                    api: {
                        login_url: { route: 'login' },
                        forgot_password_url: { route: 'forgotpass' },
                        reset_password_url: { route: 'resetpassword' },
                        authorization_url: { route: 'authorization' }
                    },
                    routes: {
                        login: { route: 'login' },
                        sign_up: { route: 'signup' },
                        forgot_password: { route: 'forgotpass' },
                        forgot_password_redirection: { route: 'login' },
                        reset_password: { route: 'resetpassword' }
                    },
                    // afterOAuthLoginMethod: (data: {[key: string]: any}) => { console.log('login data ----------->', data); },
                    // afterOAuthRefreshMethod: (data: {[key: string]: any}) => { console.log('refresh data ----------->', data); },
                    // registerUser: (data) => { console.log('data ----------->', data); },
                    main_image_url: 'https://es.freelogodesign.org/Content/img/logo-ex-7.png'
                })
            ],
            providers: [ OAuthService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthorizationComponent);
        component = fixture.componentInstance;
        // @note: cannot spy on html form submit... so I spy on the component's method without modifying its behavior
        const submit_form_spy = spyOn(component, 'submitForm').and.callThrough();
        fixture.detectChanges();
        expect(submit_form_spy).toHaveBeenCalled();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
