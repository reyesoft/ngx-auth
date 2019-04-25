import { FormGroup } from '@angular/forms';

export interface IAuthRoute {
    route: string;
    query_params?: {[key: string]: string};
}

export class AuthConfig {
    public api: {
        login_url: IAuthRoute;
        register_url: IAuthRoute;
        forgot_password_url: IAuthRoute;
        reset_password_url: IAuthRoute;
    };
    public routes: {
        login: IAuthRoute;
        sign_up: IAuthRoute;
        forgot_password: IAuthRoute;
        forgot_password_redirection: IAuthRoute;
        reset_password: IAuthRoute;
    };
    public afterOAuthLoginMethod: (data: {[key: string]: any}) => any;
    public registerUser: (data: FormGroup) => any;
    public main_image_url: string;
}
