import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CandidateService } from './services/candidatas.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    SharedModule
  ],
  providers: [CandidateService]
})
export class ReactiveStateModule { }
