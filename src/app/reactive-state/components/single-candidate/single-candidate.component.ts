import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
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
  onHire():void{}
  onGoBack():void{ this.router.navigateByUrl('/reactive-state/candidates');}
  onRefuse():void{}

}
