import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaObserver } from '@angular/flex-layout';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'auth-guest-start',
    templateUrl: './guest-start.component.html',
    styleUrls: ['./guest-start.component.scss']
})
export class GuestStartComponent implements OnInit {
    public loginForm: FormGroup;
    public errorMessage: string;
    public notShadow: boolean = false;
    public tab_names = {
        login: 0,
        signup: 1
    };
    public value: number;
    public state = '';

    public constructor(
        private formBuilder: FormBuilder,
        public mediaObserver: MediaObserver
    ) {}

    // TODO: remove and import method from ngx-jsonapi-material when supported
    public passwordValidator(control: AbstractControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        // (?!.*\s)          - Spaces are not allowed
        if (control.value.match(/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/)) {
            return null;
        } else {
            return { invalidPassword: true };
        }
    }

    public ngOnInit(): void {
        this.buildForm();
        if (window.innerWidth <= 400) {
          this.notShadow = true;
        }
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event) {
      if (event.target.innerWidth <= 400) {
        this.notShadow = true;
      } else {
        this.notShadow = false;
      }
    }

    private buildForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required, this.passwordValidator]]
        });
    }
}
