// USED BY ALL COLMENA (authed, core, guest, etc)
import { NgModule } from '@angular/core';
import { JamSubmitModule, JamTabsModule } from 'ngx-jsonapi-material';

@NgModule({
    imports: [
        JamSubmitModule,
        JamTabsModule
    ],
    exports: [
        JamSubmitModule,
        JamTabsModule
    ],
})
export class JsonapiMaterialModule {}
