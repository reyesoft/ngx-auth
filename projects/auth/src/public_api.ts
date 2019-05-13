/*
 * Public API Surface of auth
 */

export * from './lib/auth.module';

export { SignUpComponent } from './lib/guest-start/sign-up/sign-up.component';
export { ForgotPasswordComponent } from './lib/forgot-password/forgot-password.component';
export { ResetPasswordComponent } from './lib/reset-password/reset-password.component';
export { GuestStartComponent } from './lib/guest-start/guest-start.component';
export { LoginComponent } from './lib/guest-start/login/login.component';
export { OAuthInterceptor } from './lib/oauth-interceptor';

export { AuthConfig, AuthMethodsConfig, IAuthRoute } from './lib/auth-config';
