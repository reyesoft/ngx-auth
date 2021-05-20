import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassChipErrorComponent } from './pass-chip-error.component';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
    declarations: [PassChipErrorComponent],
    exports: [PassChipErrorComponent],
    imports: [
        CommonModule,
        MatChipsModule,
    ]
})
export class PassChipErrorModule { }
