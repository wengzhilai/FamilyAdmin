import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryListPage } from './query-list/query-list';

export const routes: Routes = [
  {
    path: '',
    component: QueryListPage,
    children: [
      {
        path: 'list',
        component: QueryListPage,
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryRoutingModule { }

export const routedComponents = [
];