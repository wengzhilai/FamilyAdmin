import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ModalConfirmPage } from "./modals/confirm";
import { ModalComponent } from "./modal.component";
import { ModalLoadingPage } from "./modals/loading";
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
    declarations: [
        ModalConfirmPage,
        ModalComponent,
        ModalLoadingPage,
    ],
    imports: [
        CommonModule,
        ThemeModule,
    ],
    exports: [
        CommonModule,
        ModalConfirmPage,
        ModalComponent,
        ModalLoadingPage,
    ]
})
export class ComponentsModule { }
