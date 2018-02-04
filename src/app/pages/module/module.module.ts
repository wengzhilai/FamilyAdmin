import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

import { AppTranslationModule } from '../../app.translation.module';
import { routedComponents, ModuleRoutingModule } from './module.routes';
import { ModuleListPage } from './module-list/module-list';
import { ModuleAddPage } from './module-add/module-add';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    ModuleRoutingModule,
  ],
  declarations: [
    routedComponents,
    ModuleListPage,
    ModuleAddPage,
  ],
  entryComponents: [
  ],
  exports: [

  ],
})
export class ModuleModule {
}
