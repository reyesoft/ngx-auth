import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { LowerCasePipe } from '@angular/common';
import { MediaObserver } from '@angular/flex-layout';

// Services
import { GuestStartService } from '../services/guest-start.service';

// ngx-formly
import { signup_form } from './signup-form.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CustomValidators } from 'ngx-jsonapi-material';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    // ngx-formly
    public form = new FormGroup({});
    public model: { [key: string]: any } = {};
    public fields: Array<FormlyFieldConfig> = signup_form;
    private custom_validators = new CustomValidators();

    public accepted_conditions = false;
    protected user_login: { email?: string; password?: string } = {};

    public constructor(
        public mediaObserver: MediaObserver,
        public guestStartService: GuestStartService,
        protected formBuilder: FormBuilder,
        protected lowercase: LowerCasePipe,
        protected router: Router
    ) {
        this.form = this.createSignupForm();
    }

    public registerUser(): void {
        if (this.guestStartService.authConfig.need_conditions && !this.accepted_conditions) {
            return;
        }
        this.guestStartService.register(this.form);
    }

    private createSignupForm(): FormGroup {
      return this.formBuilder.group(
          {
              email: [
                  null,
                  Validators.compose([
                      Validators.email,
                      Validators.required
                  ])
              ],
              password: [
                  null,
                  Validators.compose([
                      Validators.required,
                      Validators.minLength(8)
                  ])
              ],
              confirm_password: [null, Validators.compose([Validators.required])]
          },
          {
              // check whether our password and confirm password match
              validator: this.custom_validators.passwordMatchValidator
          });
  }
}
