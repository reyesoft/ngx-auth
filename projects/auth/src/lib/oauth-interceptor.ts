import { Injectable, Inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConfig } from './auth-config';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
    private refreshing = false;

    public constructor(
        private oAuthService: OAuthService,
        @Inject('authConfig') public authConfig: AuthConfig
    ) { /**/ }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.indexOf('auth/v1/token') === -1) {
            const expiration = this.oAuthService.getAccessTokenExpiration();
            const actual_time = new Date().getTime() / 1000;
            if (expiration && expiration - actual_time < 360) {
                if (this.refreshing) {
                    return next.handle(request);
                }
                this.refreshing = true;
                this.oAuthService.refreshToken().then((data: {[key: string]: any}): void => {
                    this.authConfig.afterOAuthRefreshMethod(data);
                    this.refreshing = false;
                });
            }
        }

        return next.handle(request);
    }
}
