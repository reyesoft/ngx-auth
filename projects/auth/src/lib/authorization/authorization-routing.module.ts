import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AuthorizationComponent } from './authorization.component';

export let routes: Array<Route> = [
    {
        path: '',
        data: { title: 'authorization application' },
        pathMatch: 'full',
        component: AuthorizationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorizationRoutingModule {
    public static components = [AuthorizationComponent];
}
