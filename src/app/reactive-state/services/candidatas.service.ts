import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, Observable, switchMap, take, tap } from "rxjs";
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
      //on doit s'amuser à ce que les chargements ne se font 
      // qu'après 5 minutes les un des autres
      //donc un chargement ne sera fait que si cà fait au moins 5 secondes qu'on a fait le dernier chargement
      private lastCandidatesLoad = 0;
      getCandidatesFromServer() {
        //implementons la logique de chargement rien qu'après au moins 5(5000 milisecondes) secondes du dernier chargement
        if (Date.now()-this.lastCandidatesLoad<5000){
            return // pas de chargement si il y a moins de 5 secondes que le dernier chargement s'est effectué
        }
        this.setLoadingStatus(true);
        this.http.get<Candidate[]>(`${environment.apiUrl}candidates`).pipe(
          delay(5000),
          tap(candidates => {
            this._candidates$.next(candidates);
            this.setLoadingStatus(false);
            //actualiser la date du dernier chargement
            this.lastCandidatesLoad = Date.now();
          })
        ).subscribe();
    }

    getCandidateById(id: number): Observable<Candidate> {
      /***on essaye dans cette méthode de recupérer une lis de candidat ayant 
       * l'id donnée en paramètre et on prend l'ément du rang 1 bien cette liste ait 
       * pour l'essentiel un seul élément
       */
      //si ce n'est pad  le dernier chargement réalisé, alors 
      //on réalise un nouveau chargement à partir du serveur
      if (!this.lastCandidatesLoad) {
        this.getCandidatesFromServer();
    }
      return this.candidates$.pipe(
          map(candidates => candidates.filter(candidate => candidate.id === id)[0])
      );
  }

  refuseCandidate(id: number): void{
    /**Il s'agit d'une suppression pessimiste. nous attendons donc que la requête réussisse
     *  avant de mettre à jour les données côté application :quand la requête réussit, nous 
     * transférons l'Observable vers les candidates$ à l'instant t ;
    si nous ne mettons pas le take(1) , nous finirons dans un infinite loop ! Tout ce qui vient 
    après ce switchMap ne doit être exécuté qu'une seule fois par suppression ;
    nous utilisons map pour modifier le tableau, retournant un tableau qui contient tous les 
    candidats sauf celui qui comporte l' id passé en argument ;
    nous faisons émettre la nouvelle liste de candidats et l'état de chargement.
    C'est cette dernière étape qui fait toute la magie du state management réactif : le reste 
    de l'application n'a pas besoin de suivre l'avancée de la requête de suppression. Les components 
    qui sont souscrits aux Observables du service vont simplement afficher les nouvelles données 
    qui sont émises ! */
    this.setLoadingStatus(true)
    this.http.delete(`${environment.apiUrl}candidates/${id}`).pipe(
      tap(() => {
        console.log('Suppression réussie pour le candidat avec ID:', id);
      }),
      delay(1000),
      switchMap(()=>this.candidates$),
      take(1),
      map(candidates =>candidates.filter(candidate => candidate.id !== id)),
      tap(candidates => {
        this._candidates$.next(candidates)
        this.setLoadingStatus(false)
      })
    ).subscribe()
  }

  hireCandidate(id: number): void {
    /**nous allons pouvoir modifier l'information sur la compay d'un candidat lorsqu'on clique sur le
     * bouton hire afin de l'embaucher. Ainsi la compagny qui candidat deviendra Snapface Ltd 
     * nous utilisons ici l'approche optinikste c-à-d que nous modifion notre instance avant de le soumettre
     * au serveur
     */
    this.candidates$.pipe(
        take(1),
        map(candidates => candidates
            .map(candidate => candidate.id === id ?
                { ...candidate, company: 'Elco Business & Technologies' } :
                candidate
            )
        ),
        tap(updatedCandidates => this._candidates$.next(updatedCandidates)),
        switchMap(updatedCandidates =>
          //envoi de la requete avec le nouveau tableau mis à jour
            this.http.patch(`${environment.apiUrl}candidates/${id}`,
            updatedCandidates.find(candidate => candidate.id === id))
        )
    ).subscribe();
}

}