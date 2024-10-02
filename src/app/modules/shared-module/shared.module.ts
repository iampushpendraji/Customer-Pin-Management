import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewEntityComponent } from './create-new-entity/create-new-entity.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateNewEntityComponent
  ],
  imports: [
    CommonModule,
    NgxSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateNewEntityComponent
  ]
})
export class SharedModule { }
