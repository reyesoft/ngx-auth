import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthInterceptor } from './oauth-interceptor';
import { RouterModule } from '@angular/router';
import { AuthFormlyFormFlexLayoutComponent } from './dynamic-forms/formly-form-flex.component';
import { AuthMaterialModule } from './auth-material.module';
import { JsonapiMaterialModule } from './jsonapi-material.module';
import { AuthConfig, AuthMethodsConfig } from './auth-config';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';
import { ResetPasswordService } from './reset-password/reset-password.service';
import { GuestStartService } from './guest-start/services/guest-start.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './guest-start/login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GuestStartComponent } from './guest-start/guest-start.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { LowerCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import {AuthorizationModule} from './authorization/authorization.module';
import {SocialButtonsModule} from './guest-start/social-buttons/social-buttons.module';
import {
    FlexLayoutModule,
    MediaObserver,
    LayoutAlignStyleBuilder,
    LayoutGapStyleBuilder,
    StyleUtils,
    StylesheetMap,
    MediaMarshaller,
    ɵMatchMedia,
    BreakPointRegistry,
    PrintHook,
    LayoutStyleBuilder,
    FlexStyleBuilder,
    ShowHideStyleBuilder,
    FlexOrderStyleBuilder
} from '@angular/flex-layout';
import { MessageComponent } from './message/message.component';
import { SignUpModule } from './guest-start/sign-up/sign-up.module';

@NgModule({
    declarations: [
        GuestStartComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        LoginComponent,
        MessageComponent,
        // TODO: remove and import from ngx-jsonapi-material when supported
        AuthFormlyFormFlexLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FlexLayoutModule,
        JsonapiMaterialModule,
        FormsModule,
        SignUpModule,
        ReactiveFormsModule,
        // TODO: update when ngx-jsonapi-material supports it
        FormlyModule.forRoot({
            validationMessages: [
                {name: 'required', message: 'Este campo es requerido'}
            ]
        }),
        SocialButtonsModule,
        FormlyMaterialModule,
        AuthMaterialModule
    ],
    providers: [
        GuestStartService,
        ResetPasswordService,
        ForgotPasswordService,
        AuthMethodsConfig,
        MediaObserver,
        LayoutAlignStyleBuilder,
        LayoutGapStyleBuilder,
        StyleUtils,
        StylesheetMap,
        MediaMarshaller,
        ɵMatchMedia,
        BreakPointRegistry,
        PrintHook,
        LayoutStyleBuilder,
        FlexStyleBuilder,
        ShowHideStyleBuilder,
        FlexOrderStyleBuilder,
        LowerCasePipe
    ],
    exports: [
        LoginComponent,
        GuestStartComponent,
        ResetPasswordComponent,
        AuthorizationModule,
        SocialButtonsModule,
        ForgotPasswordComponent
    ]
})
export class AuthModule {
    static forRoot(authConfig: AuthConfig): ModuleWithProviders<AuthModule> {
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
