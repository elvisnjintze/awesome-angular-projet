import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component';

const routes: Routes = [
  { path: 'candidates', component: CandidateListComponent },
  { path: 'candidates/:id', component: SingleCandidateComponent },
  { path: '', pathMatch: 'full', redirectTo: 'candidates' }
];
/*Il faut rajouter pathMatch: 'full'  sur une redirection depuis la route vide.
La route vide étant parent de toute autre route, si vous ne redirigez pas
 uniquement le path strictement vide, vous aurez un infinite loop où votre 
 redirection sera redirigée sera redirigée sera redirigée… */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveStateRoutingModule { }
