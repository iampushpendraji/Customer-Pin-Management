import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinsRoutingModule } from './pins-routing.module';
import { AddPinsComponent } from './add-pins/add-pins.component';
import { SharedModule } from '../shared-module/shared.module';


@NgModule({
  declarations: [
    AddPinsComponent
  ],
  imports: [
    CommonModule,
    PinsRoutingModule,
    SharedModule
  ]
})
export class PinsModule { }
