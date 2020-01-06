import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from './auth.module';
import {LoginComponent} from './guest-start/login/login.component';
import {SignUpComponent} from './guest-start/sign-up/sign-up.component';
import {GuestStartComponent} from './guest-start/guest-start.component';
import {OAuthModule, OAuthService} from 'angular-oauth2-oidc';

describe('Ngx-Auth integration test', () => {
    let guest_start_fixture: ComponentFixture<GuestStartComponent>;
    let guest_start_component: GuestStartComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                OAuthModule.forRoot({
                    resourceServer: {
                        allowedUrls: [],
                        sendAccessToken: true
                    }
                }),
                AuthModule.forRoot({
                  api: {
                    login_url: { route: 'login' },
                    forgot_password_url: { route: 'forgotpass' },
                    reset_password_url: { route: 'resetpassword' }
                  },
                  routes: {
                    login: { route: 'login' },
                    sign_up: { route: 'signup' },
                    forgot_password: { route: 'forgotpass' },
                    forgot_password_redirection: { route: 'login' },
                    reset_password: { route: 'resetpassword' }
                  },
                  main_image_url: 'https://es.freelogodesign.org/Content/img/logo-ex-7.png'
                })
            ],
            providers: [OAuthService]
        }).compileComponents();
    });

    it('should create GuestStartComponent', () => {
        guest_start_fixture = TestBed.createComponent(GuestStartComponent);
        guest_start_component = guest_start_fixture.componentInstance;
        expect(guest_start_component).toBeTruthy();
    });
});
