import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPinsComponent } from './add-pins/add-pins.component';

const routes: Routes = [
  {
    path: '',
    component: AddPinsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PinsRoutingModule { }
