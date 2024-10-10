import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable, tap } from "rxjs";
import { Candidate } from "../models/candidate.model";
import { environment } from "../../../environments/environment.prod";


@Injectable()
export class CandidateService {
    constructor(private http:HttpClient){}
    //Il y a deux éléments de state – des sources de données – à exposer dans CandidatesService :
    //loading$  – qui émettra  true  ou  false  selon qu'un chargement est en cours ou non ;
    //candidates$  – qui émettra des tableaux de  Candidate .
    //Pour créer des BehaviorSubjects qui sont exposés comme des Observables simples
    // (empêchant des components d'appeler leur méthode  next ), je vous propose un pattern  
    //private + getter  :
    //Ce système permet de traiter  loading$  et  candidates$  comme des variables.


    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
      return this._loading$.asObservable();
    }
  
    private _candidates$ = new BehaviorSubject<Candidate[]>([]);
    get candidates$(): Observable<Candidate[]> {
      return this._candidates$.asObservable();
    }

    private setLoadingStatus(loading: boolean) {
        /**Appeler  next  sur l'un des BehaviorSubjects du service, 
         * c'est s'assurer que tous les components qui sont souscrits à leurs 
         * Observables recevront cette nouvelle donnée.*/
        this._loading$.next(loading);
      }

      getCandidatesFromServer() {
        this.setLoadingStatus(true);
        this.http.get<Candidate[]>(`${environment.apiUrl}candidates`).pipe(
          delay(5000),
          tap(candidates => {
            this._candidates$.next(candidates);
            this.setLoadingStatus(false);
          })
        ).subscribe();
    }
}