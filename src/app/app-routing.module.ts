import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfPinsComponent } from './components/list-of-pins/list-of-pins.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { 
    path: '', 
    component: ListOfPinsComponent 
  },
  { 
    path: 'customers', 
    loadChildren: () => import('./modules/customers-module/customers.module').then(p => p.CustomersModule) 
  },
  { 
    path: 'pins', 
    loadChildren: () => import('./modules/pins-module/pins.module').then(p => p.PinsModule) 
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
