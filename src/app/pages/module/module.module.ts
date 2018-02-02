import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';


import { routes } from './module.routes';
import { routedComponents } from './module.routes';
import { ModalModule } from 'ngx-bootstrap';
import { AppTranslationModule } from '../../app.translation.module';
import { ModuleListPage } from './module-list/module-list';


@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppTranslationModule,
  ],
  declarations: [
    ModuleListPage
  ],
  entryComponents: [
  ],
  exports: [

  ],
})
export class ModuleModule {
}
