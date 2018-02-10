import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

import { AppTranslationModule } from '../../app.translation.module';
import { ServiceModule } from "../../@core/Service/service.module";
import { ModalModule } from 'ngx-bootstrap/modal';
import { QueryListPage } from './query-list/query-list';
import { QueryRoutingModule } from './query.routes';
import { SmartTableFormatValuePage } from "../../components/SmartTable/formatValue";
import { ComponentsModule } from "../../components/components.module";
import { QueryQueryComponent } from './query/query';
import { QueryComponent } from './query.component';


@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    QueryRoutingModule,
    ServiceModule,
    ComponentsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    QueryListPage,
    QueryQueryComponent,
    QueryComponent,
  ],
  entryComponents: [
    SmartTableFormatValuePage
  ],
  exports: [
  ],
})
export class QueryModule {
}