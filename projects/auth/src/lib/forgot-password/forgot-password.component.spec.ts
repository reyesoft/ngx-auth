// "src/app/guest/forgot-password/forgot-password",
import { async, fakeAsync, tick, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthConfig } from '../auth-config';
import { ForgotPasswordService } from './forgot-password.service';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './forgot-password.component';
import { By } from '@angular/platform-browser';
import { mock, instance, when } from 'ts-mockito';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MediaObserver } from '@angular/flex-layout';

export class DummyComponent {}

const auth_config: AuthConfig = {
    api: {
        login_url: {route: 'aaaaaa'},
        forgot_password_url: {route: 'aaaaaa'},
        reset_password_url: {route: 'aaaaaa'},
    },
    routes: {
        login: {route: 'aaaaaa'},
        sign_up: {route: 'aaaaaa'},
        forgot_password: {route: 'aaaaaa'},
        forgot_password_redirection: {route: 'aaaaaa'},
        reset_password: {route: 'aaaaaa'},
    },
    main_image_url: 'https://es.freelogodesign.org/Content/img/logo-ex-7.png'
};

function newEvent(eventName: string, bubbles = false, cancelable = false) {
    const evt = document.createEvent('Event'); // MUST be 'CustomEvent'
    evt.initEvent(eventName, bubbles, cancelable);

    return evt;
}

const ForgotPasswordServiceMock = mock(ForgotPasswordService);
when(ForgotPasswordServiceMock.authConfig).thenReturn(auth_config);

class ObservableMediaMock {
    public constructor() {
        /**/
    }
    public isActive(size) {
        return [true, false][Math.floor(Math.random() * 2)];
    }
}

describe('ForgotPasswordComponent', () => {
    let component: ForgotPasswordComponent;
    let fixture: ComponentFixture<ForgotPasswordComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([{ path: 'companies/:company_id/dashboard', component: DummyComponent }])
            ],
            declarations: [ForgotPasswordComponent],
            providers: [
                { provide: AuthConfig, useValue: auth_config},
                { provide: MediaObserver, useValue: new ObservableMediaMock() },
                { provide: ForgotPasswordService, useFactory: (): ForgotPasswordService => instance(ForgotPasswordServiceMock) }
            ]
        }).compileComponents();
    });

    beforeEach(
        fakeAsync((() => {
            fixture = TestBed.createComponent(ForgotPasswordComponent);
            component = fixture.componentInstance;
        }))
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(
        'form should update user',
        fakeAsync(() => {
            // next line handles ExpressionCHangedAfterItHasBeenChackedError
            const input = fixture.debugElement.query(By.css('input'));
            const name = 'my Name';
            input.nativeElement.value = name;
            const evt = document.createEvent('Event');
            evt.initEvent('input', true, false);
            fixture.detectChanges();
            tick();
            input.nativeElement.dispatchEvent(evt);
            fixture.detectChanges();
            tick();
            input.triggerEventHandler('ngModelChange', input.nativeElement.value);
            tick(50);
            fixture.whenStable().then(() => expect(component.user.email).toBe(name));
        })
    );
});
