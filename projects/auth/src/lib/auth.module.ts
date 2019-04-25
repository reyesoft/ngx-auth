import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFormlyFormFlexLayoutComponent } from 'projects/auth/src/lib/dynamic-forms/formly-form-flex.component';
import { AuthMaterialModule } from 'projects/auth/src/lib/auth-material.module';
import { JsonapiMaterialModule } from 'projects/auth/src/lib/jsonapi-material.module';
import { AuthConfig } from 'projects/auth/src/lib/auth-config';
import { ForgotPasswordService } from 'projects/auth/src/lib/forgot-password/forgot-password.service';
import { ResetPasswordService } from 'projects/auth/src/lib/reset-password/reset-password.service';
import { GuestStartService } from 'projects/auth/src/lib/guest-start/services/guest-start.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './guest-start/login/login.component';
import { SignUpComponent } from './guest-start/sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GuestStartComponent } from './guest-start/guest-start.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { LowerCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@NgModule({
    declarations: [
        GuestStartComponent,
        ResetPasswordComponent,
        SignUpComponent,
        LoginComponent,
        ForgotPasswordComponent,
        // AuthConfig,
        // TODO: remove and import from ngx-jsonapi-material when supported
        AuthFormlyFormFlexLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        JsonapiMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        // TODO: update when ngx-jsonapi-material supports it
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'Este campo es requerido' }
            ]
        }),
        FormlyMaterialModule,
        AuthMaterialModule
    ],
    providers: [
        GuestStartService,
        ResetPasswordService,
        ForgotPasswordService,
        // OAuthService,
        LowerCasePipe
    ],
    exports: [
        GuestStartComponent,
        ResetPasswordComponent,
        SignUpComponent,
        LoginComponent,
        // AuthConfig,
        ForgotPasswordComponent
    ]
})
export class AuthModule {
    static forRoot(authConfig: AuthConfig): ModuleWithProviders {
        // User authConfig get logged here
        console.log('authConfig -------->', authConfig);
        return {
            ngModule: AuthModule,
            providers: [
                {provide: 'authConfig', useValue: authConfig},
                GuestStartService,
                ResetPasswordService,
                ForgotPasswordService,
                LowerCasePipe
            ]
        };
    }
}
