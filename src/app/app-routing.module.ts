import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from 'projects/auth/src/lib/reset-password/reset-password.component';
import { ForgotPasswordComponent } from 'projects/auth/src/lib/forgot-password/forgot-password.component';
import { GuestStartComponent } from 'projects/auth/src/lib/guest-start/guest-start.component';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from 'projects/auth/src/lib/message/message.component';

const routes: Routes = [
    {
        path: 'login',
        data: { title: 'Login' },
        component: GuestStartComponent
    },
    {
        path: 'resetpassword',
        data: { title: 'Reset password' },
        component: ResetPasswordComponent
    },
    {
        path: 'forgotpass',
        data: { title: 'Forgot password' },
        component: ForgotPasswordComponent
    },
    {
        path: 'message',
        data: { title: 'Message' },
        component: MessageComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        component: GuestStartComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
