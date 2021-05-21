import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

const regularExpressions = {
    capitalLetter: /[A-Z]/,
    lowercaseLetter: /[a-z]/,
    numeric: /[0-9]/,
    minLength: /^.{8}/
};

@Component({
    selector: 'auth-pass-chip-error',
    templateUrl: './pass-chip-error.component.html',
    styleUrls: ['./pass-chip-error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassChipErrorComponent implements OnChanges {
    public haveCapitalLetter = true;
    public haveLowercaseLetter = true;
    public haveNumeric = true;
    public haveMinLength = true;
    @Input() public onBlur = false;
    @Input() public passwordControl: FormControl;

    public static passwordValidate(control: AbstractControl): { [key: string]: any } | null {
        if (!/[A-Z]/.test(control.value)) {
            return { forbiddenName: 'error' };
        }
        if (!/[a-z]/.test(control.value)) {
            return { forbiddenName: 'error' };
        }
        if (!/[0-9]/.test(control.value)) {
            return { forbiddenName: 'error' };
        }
        if (!/^.{8}/.test(control.value)) {
            return { forbiddenName: 'error' };
        }

        return null;
    }

    public constructor(private changeDetectorRef: ChangeDetectorRef) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.passwordControl && changes.passwordControl.currentValue !== undefined) {
            this.observerPassValue();
        }
        if (changes.onBlur && changes.onBlur.currentValue !== undefined ) {
            this.validatePassword();
        }
    }

    private observerPassValue(): void {
        this.passwordControl.valueChanges.subscribe(() => {
            this.validatePassword();
        });
    }

    private validatePassword(): void {
        this.haveCapitalLetter = this.validateRegularExpressions('capitalLetter');
        this.haveLowercaseLetter = this.validateRegularExpressions('lowercaseLetter');
        this.haveNumeric = this.validateRegularExpressions('numeric');
        this.haveMinLength = this.validateRegularExpressions('minLength');
        this.changeDetectorRef.detectChanges();
    }

    private validateRegularExpressions(type: string): boolean {
        if (regularExpressions[type].exec(this.passwordControl.value)) {
            return true;
        }

        return false;
    }
}
