import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

import { AppTranslationModule } from '../../app.translation.module';
import { ServiceModule } from "../../@core/Service/service.module";
import { ModalModule } from 'ngx-bootstrap/modal';
import { QueryListPage } from './query-list/query-list';
import { routedComponents, QueryRoutingModule } from './query.routes';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    QueryRoutingModule,
    ServiceModule,
    ModalModule.forRoot()
  ],
  declarations: [
    routedComponents,
    QueryListPage,
  ],
  entryComponents: [
  ],
  exports: [
  ],
})
export class QueryModule {
}
