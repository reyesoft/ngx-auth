import { NgModule } from '@angular/core';
import { SocialButtonsComponent } from './social-buttons.component';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    SocialButtonsComponent
  ],
  declarations: [SocialButtonsComponent]
})
export class SocialButtonsModule {}
