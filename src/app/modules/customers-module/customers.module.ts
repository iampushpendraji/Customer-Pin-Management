import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { SharedModule } from '../shared-module/shared.module';


@NgModule({
  declarations: [
    AddCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ]
})
export class CustomersModule { }
