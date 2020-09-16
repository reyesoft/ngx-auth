import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SocialButton } from './social-button';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
    selector: 'auth-social-buttons',
    templateUrl: './social-buttons.component.html',
    styleUrls: ['./social-buttons.component.scss']
})
export class SocialButtonsComponent {
    @Input() public socialButtons: Array<SocialButton>;
    @Output() public buttonClick = new EventEmitter<string>();

    public emitButtonClick(key: string) {
        this.buttonClick.emit(key);
    }
}
