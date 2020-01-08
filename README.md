# NGX Auth - Reyesoft

Front-end authentication library using OAuth.

## Quick start

0- Before starting, note that this library requires the following packages to be correctly configured in order to work fine:

*   angular-oauth2-oidc
*   ngx-jsonapi
*   ngx-jsonapi-material

1- Add ngx-auth to your Angular project

*   Using npm:

`npm install ngx-auth --save`

*   Using yarn:

`yarn add ngx-auth`

2- Import AuthModule in your main module (AppModule) and pass configuration using `forRoot` method

```typescript
import { AuthModule, AuthConfig, AuthMethodsConfig } from '@reyesoft/ngx-auth';
...
AuthModule.forRoot({
    api: {
        login_url: { route: environment.AUTHURL + 'some_url' },
        forgot_password_url: { route: environment.APIURL + 'some_url' },
        authorization_url: { route: environment.APIURL + 'some_url' },
        auth_code_login: { route: environment.APIURL + 'some_url' },
        social_login_url: { route: environment.APIURL + 'some_url' },
        reset_password_url: { route: environment.APIURL + 'some_url' }
    },
    routes: {
        login: { route: 'some_route', query_params: { query: 'some_query_parameter' }},
        sign_up: { route: 'some_route', query_params: { query: 'some_query_parameter' }},
        forgot_password: { route: 'some_route', query_params: { query: 'some_query_parameter' }},
        forgot_password_redirection: { route: 'some_route', query_params: { query: 'some_query_parameter' }},
        reset_password: { route: 'some_route', query_params: { query: 'some_query_parameter' }}
    },
    main_image_url: 'site_logo.svg',
    need_conditions: false,
    social_buttons: [
        { key: 'faceboook', color: 'blue', svgIcon: 'facebook', text: 'Iniciar con Facebook' }
    ];
}),
...
```

**IMPORTANT:** don't forget to register the custom svgIcon used for social button in the MatIconRegistry (https://material.angular.io/components/icon/api#MatIconRegistry)

3- Inject AuthMethodsConfig in the main module constructor (AppModule) and provide your custom methods to the library

```typescript
import { AuthModule, AuthConfig, AuthMethodsConfig } from '@reyesoft/ngx-auth';
...
export class AppModule {
    public constructor(
        private authMethodsConfig: AuthMethodsConfig
    ) {
        this.configNgxAuth();
    }

    private configNgxAuth() {
        this.authMethodsConfig.registerUser = your_custom_method_to_register_a_new_user;
        this.authMethodsConfig.afterOAuthLoginMethod = your_custom_method_to_login_after_fetching_token;
        this.authMethodsConfig.afterOAuthRefreshMethod = your_custom_method_to_run_after_refreshing_token;
    }
...
```

4- If you want to refresh the access_token automatically using the refresh_token, provide OAuthInterceptor

```typescript
import { AuthModule, AuthConfig, AuthMethodsConfig, OAuthInterceptor } from '@reyesoft/ngx-auth';
...
{
    provide: HTTP_INTERCEPTORS,
    useClass: OAuthInterceptor,
    multi: true
},
...
```

5- Use the library's authentication components in your Login, Sign-up and Password Reset views

```typescript
import { ForgotPasswordComponent, ResetPasswordComponent, GuestStartComponent } from '@reyesoft/ngx-auth';
...
const routes: Routes = [
    {
        path: 'login',
        component: GuestStartComponent
    },
    {
        path: 'resetpassword',
        component: ResetPasswordComponent
    },
    {
        path: 'forgotpassword',
        component: ForgotPasswordComponent
    }
...
```
