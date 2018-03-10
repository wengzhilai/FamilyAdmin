import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmPage } from "./modals/confirm";
import { ModalLoadingPage } from "./modals/loading";
import { ThemeModule } from '../@theme/theme.module';
import { SmartTableFormatValuePage } from "./SmartTable/formatValue";
import { TooltipModule } from 'ngx-bootstrap';
import { RoleEditComponent } from "./role-edit/role-edit.component";
import { EditComponent } from "./edit/edit.component";
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
    declarations: [
        ModalConfirmPage,
        SmartTableFormatValuePage,
        ModalLoadingPage,
        RoleEditComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        ThemeModule,
        TooltipModule.forRoot(),
        TreeviewModule.forRoot(),
    ],
    exports: [
        CommonModule,
        ModalConfirmPage,
        ModalLoadingPage,
        SmartTableFormatValuePage,
        RoleEditComponent,
        EditComponent,
    ]
})
export class ComponentsModule { }
