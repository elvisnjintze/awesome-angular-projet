import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CandidateService } from './services/candidatas.service';
import { RouterModule } from '@angular/router';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    SharedModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [CandidateService]
})
export class ReactiveStateModule { }
