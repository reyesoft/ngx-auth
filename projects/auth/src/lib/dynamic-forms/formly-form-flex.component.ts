import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormlyForm } from '@ngx-formly/core';

// TODO: remove and import from ngx-jsonapi-material when supported
@Component({
    selector: 'auth-formly-form-flex',
    template: `
      <formly-field *ngFor="let field of fields"
        [fxFlex]="field.templateOptions.fxFlex"
        [field]="field"
        [ngClass]="field.className"
        >
      </formly-field>
      <ng-content></ng-content>
  `
})
export class AuthFormlyFormFlexLayoutComponent extends FormlyForm {}
