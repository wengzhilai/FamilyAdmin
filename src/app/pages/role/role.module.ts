import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

import { routedComponents, RoleRoutingModule } from './role.routes';
import { AppTranslationModule } from '../../app.translation.module';
import { RoleListPage } from './role-list/role-list';
import { TreeviewModule } from 'ngx-treeview';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    RoleRoutingModule,
    ModalModule.forRoot(),
    TreeviewModule.forRoot(),
  ],
  declarations: [
    routedComponents,
    RoleListPage,
    RoleEditComponent,
  ],
  entryComponents: [
    RoleEditComponent
  ],
  exports: [

  ],
})
export class RoleModule {
}
