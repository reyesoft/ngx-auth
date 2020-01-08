import {Component, ElementRef, AfterViewInit, ViewChild, Inject} from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute } from '@angular/router';
import {AuthConfig} from '../auth-config';
import {throwError} from 'rxjs';

@Component({
  selector: 'auth-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements AfterViewInit {

    // @todo: agregar la URL para enviar el POST del formulario
    public authorization_url: string;
    public token: string;
    public client_id: string;
    public redirect_uri: string;
    @ViewChild('form', {static: false}) private form: ElementRef<HTMLFormElement>;

    public constructor(
        private oAuthService: OAuthService, public activatedRoute: ActivatedRoute,
        @Inject('authConfig') public authConfig: AuthConfig

    ) {
        if (!this.authConfig.api || !this.authConfig.api.authorization_url || !this.authConfig.api.authorization_url.route) {
            throw new Error(
               'You must provide "forgot_password_url" configuration when importing AuthModule in your application'
            );
        }
        this.authorization_url = this.authConfig.api.authorization_url.route;
        this.token = oAuthService.getAccessToken();
        this.client_id = this.activatedRoute.snapshot.queryParams.client_id;
        this.redirect_uri = this.activatedRoute.snapshot.queryParams.redirect_uri;
    }

    public ngAfterViewInit() {
        this.submitForm();
    }

    public submitForm() {
        this.form.nativeElement.submit();
    }

}
