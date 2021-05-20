/*
 * Public API Surface of auth
 */

export * from './lib/auth.module';

export { SignUpComponent } from './lib/guest-start/sign-up/sign-up.component';
export { ForgotPasswordComponent } from './lib/forgot-password/forgot-password.component';
export { ForgotPasswordService } from './lib/forgot-password/forgot-password.service';
export { ResetPasswordComponent } from './lib/reset-password/reset-password.component';
export { MessageComponent } from './lib/message/message.component';
export { ResetPasswordService } from './lib/reset-password/reset-password.service';
export { GuestStartComponent } from './lib/guest-start/guest-start.component';
export { GuestStartService } from './lib/guest-start/services/guest-start.service';
export { LoginComponent } from './lib/guest-start/login/login.component';
export { OAuthInterceptor } from './lib/oauth-interceptor';
export { PassChipErrorModule } from './lib/pass-chip-error/pass-chip-error.module';
export { PassChipErrorComponent } from './lib/pass-chip-error/pass-chip-error.component';
export { AuthorizationComponent } from './lib/authorization/authorization.component';
export { AuthorizationModule } from './lib/authorization/authorization.module';
export { SocialButtonsModule } from './lib/guest-start/social-buttons/social-buttons.module';
export { SocialButtonsComponent } from './lib/guest-start/social-buttons/social-buttons.component';

export { AuthConfig, AuthMethodsConfig, IAuthRoute } from './lib/auth-config';
