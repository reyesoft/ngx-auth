/*
 * Public API Surface of auth
 */

export * from './lib/auth.module';

export { SignUpComponent } from './lib/guest-start/sign-up/sign-up.component';
export { ForgotPasswordComponent } from './lib/forgot-password/forgot-password.component';
export { ForgotPasswordService } from './lib/forgot-password/forgot-password.service';
export { ResetPasswordComponent } from './lib/reset-password/reset-password.component';
export { ResetPasswordService } from './lib/reset-password/reset-password.service';
export { GuestStartComponent } from './lib/guest-start/guest-start.component';
export { GuestStartService } from './lib/guest-start/services/guest-start.service';
export { LoginComponent } from './lib/guest-start/login/login.component';
export { OAuthInterceptor } from './lib/oauth-interceptor';

export { AuthConfig, AuthMethodsConfig, IAuthRoute } from './lib/auth-config';
