import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidatas.service';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-single-candidate',
  standalone: true,
  imports: [SharedModule,CommonModule],
  templateUrl: './single-candidate.component.html',
  styleUrl: './single-candidate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent implements OnInit{
 //nous avons besoin d'un loading pour charger le spinner d'attente
 //et d'un candidat
  loading$!: Observable<boolean>
 candidate$!: Observable<Candidate>
 constructor(private candidatesServices: CandidateService, private route: ActivatedRoute, private router: Router, private http:HttpClient){}

  ngOnInit(): void {
    this.initObservable()

  }
  private initObservable():void{
    /**on initialise les observables */
    this.loading$ = this.candidatesServices.loading$
    //on recupèrer le candidat dont l'id est dans la route active
    //tout d'abord en recupérant dans les paramètres de la route active 
    //l'id avec +params['id'] et le signe + permet de caster cet id 
    // en number car il peut etre un string 
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidatesServices.getCandidateById(+params['id']))
  );
  }
  
  onGoBack():void{ this.router.navigateByUrl('/reactive-state/candidates');}

  onRefuse():void{
    /**nous avons besoin de l' id du candidat pour le supprimer, donc vous partez de
     *  l'Observable  candidate$ .nous utilisons take(1) car la logique ici ne doit
     *  être exécutée qu'une seule fois par appel.
      nous déclenchons la suppression et nous redirigeons immédiatement l'utilisateur.
      Du coup, l'utilisateur se retrouve sur la list-view avec un spinner pendant une 
      seconde, puis la liste des candidats se met à jour correctement !
      Nous pouvons toujours utiliser Git pour annuler les modifications de db.json dans 
      le dossier du backend pour revenir en arrière au niveau de la base de données, retrouvant 
      la liste des candidats d'origine. */
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
          this.candidatesServices.refuseCandidate(candidate.id)
          this.onGoBack()
      })
  ).subscribe();
  }

  onHire():void{
    //nous faisons la meme chose que dans le cas de la mèthode onRefuse
    //le candidat sera embauché et le champ compagny sera changé en Snapface Ltd
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
          this.candidatesServices.hireCandidate(candidate.id);
          this.onGoBack();
      })
  ).subscribe();
  }

}
