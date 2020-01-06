import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatButtonModule, AuthorizationRoutingModule, RouterModule, FormsModule],
    declarations: [AuthorizationComponent],
    exports: [AuthorizationComponent]
})
export class AuthorizationModule {}
