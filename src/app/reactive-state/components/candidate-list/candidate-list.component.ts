import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidatas.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [SharedModule,RouterModule,CommonModule,HttpClientModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit{
  //nous avons deux observables qui seront issu  des services
  loading$!: Observable<boolean>
  candidates$!: Observable<Candidate[]>
  constructor(private candidatesService:CandidateService){}

  ngOnInit(): void {
    this.inintObservables()
    this.candidatesService.getCandidatesFromServer();
  }
  inintObservables():void{
    /**initialisation de nos deux observables: loading qui doit permettre de 
     * lancer le spinner d'attente 
     * lorsque le service sera entrain de charger la donnée à partir du serveur
     * et candidates$ qui recuperera la dite donnée
     */
    this.loading$ = this.candidatesService.loading$
    this.candidates$ = this.candidatesService.candidates$
  }

}
