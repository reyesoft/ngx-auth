import { BrowserModule } from '@angular/platform-browser';
import { AuthConfig } from 'projects/auth/src/lib/auth-config';
import { AuthModule } from 'projects/auth/src/lib/auth.module';
import { NgModule } from '@angular/core';

import { OAuthModule, OAuthStorage, OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [''],
                sendAccessToken: true
            }
        }),
    AuthModule.forRoot({
        api: {
            login_url: {route: 'aaaaaa'},
            register_url: {route: 'aaaaaa'},
            forgot_password_url: {route: 'aaaaaa'},
            reset_password_url: {route: 'aaaaaa'},
        },
        routes: {
            login: {route: 'aaaaaa'},
            sign_up: {route: 'aaaaaa'},
            forgot_password: {route: 'aaaaaa'},
            forgot_password_redirection: {route: 'aaaaaa'},
            reset_password: {route: 'aaaaaa'},
        },
        afterOAuthLoginMethod: (data: {[key: string]: any}) => { console.log('login data ----------->', data); },
        afterOAuthRefreshMethod: (data: {[key: string]: any}) => { console.log('refresh data ----------->', data); },
        registerUser: (data) => { console.log('data ----------->', data); },
        main_image_url: 'https://es.freelogodesign.org/Content/img/logo-ex-7.png'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    public constructor(private oAuthService: OAuthService) {
        this.configOAuth();
    }

    private configOAuth() {
        this.oAuthService.requireHttps = false;
        this.oAuthService.setStorage(sessionStorage);
        this.oAuthService.tokenEndpoint = 'someurl/' + 'token';
        // The SPA's id. Register SPA with this id at the auth-server
        this.oAuthService.clientId = 'clientId';
        // set the scope for the permissions the client should request
        this.oAuthService.scope = 'openid profile email voucher';
        this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
        // Set a dummy secret
        this.oAuthService.dummyClientSecret = `dummyClientSecret`;
    }
}
