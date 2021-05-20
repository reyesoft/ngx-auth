import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PassChipErrorModule } from '../../pass-chip-error/pass-chip-error.module';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        PassChipErrorModule,
        MatIconModule
    ],
    declarations: [SignUpComponent],
    exports: [SignUpComponent]
})
export class SignUpModule {}
