import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexFormRoutingModule } from './complex-form-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComplexFormService } from './services/complex-form.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComplexFormRoutingModule,
    SharedModule,
    ReactiveFormsModule, HttpClientModule
  ],
  providers:[ComplexFormService]
})
export class ComplexFormModule { }
