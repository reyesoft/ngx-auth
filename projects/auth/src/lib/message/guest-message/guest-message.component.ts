import { Component, OnInit, Input } from '@angular/core';
import { GuestStartService } from "../../guest-start/services/guest-start.service";

@Component({
    selector: 'app-guest-message',
    templateUrl: './guest-message.component.html',
    styleUrls: ['./guest-message.component.scss']
})
export class GuestMessageComponent {
    @Input() public buttonLabel?: string;

    public constructor(
        public guestStartService: GuestStartService,
    ) {}
}
