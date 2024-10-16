import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidatas.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';

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
  //nous implementons la recherche en temps réel dans un formulaire de recherche
  //et un critère de recherche (sur le nom, le prénom, ou sur l'entreprise)
  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  //nous avons maintenant untableau d'options pour le dropdown :
  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
}[];
  constructor(private candidatesService:CandidateService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initForm()
    this.inintObservables()
    this.candidatesService.getCandidatesFromServer();
  }
  initForm(): void{
    this.searchCtrl = this.formBuilder.control('')
    //InitialisersearchCtrl est facile, mais comment faire pour que les valeurs émises par  
    //searchTypeCtrl soient typées strictement pour être les clés lastName ,  firstName et company de 
    //la classe Candidate ? Plusieurs solutions s'offrent à vous. Nous allons utiliser un enum . 
    //Créons un dossier  enums dans le module et créez-y un fichier candidate-search-type.enum.ts
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
        { value: CandidateSearchType.LASTNAME, label: 'Nom' },
        { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
        { value: CandidateSearchType.COMPANY, label: 'Entreprise' }
    ];
  }
  inintObservables():void{
    /**initialisation de nos deux observables: loading qui doit permettre de 
     * lancer le spinner d'attente 
     * lorsque le service sera entrain de charger la donnée à partir du serveur
     * et candidates$ qui recuperera la dite donnée
     */
    this.loading$ = this.candidatesService.loading$
    //nos candidats ne serons pas seulement entièrement listé, mais aussi ils tiendront
    //compte du resultat de la recherche d'où nous commentons la récupération des quandidat 
    //suivant et nous allons proséder autrement en tenant compte du résultat de recherche
    // saisi dans notre champ de recherche
    //this.candidates$ = this.candidatesService.candidates$

    //nous créons deux observables qui font contenir les valeurs des champs search et searchType
    //soit search$ et searchType$ 
    /**Ici, comme précédemment, vous ajoutez un opérateur startWith pour faire émettre les Observables 
     * au moment de la souscription – ils émettront la valeur par défaut des champs. Pour le champ de 
     * texte, la transformation en minuscules va permettre de créer une recherche qui n'est pas 
     * sensible à la casse (où "snapface", "SNAPFACE" et "SnaPFaCe" sont tous les trois reconnus, 
     * par exemple). */
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),//il il toujours un élément dans le champ meme vide ""
      map(value => value.toLowerCase())
  );
  const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)//il y a une valeur par defaut soit "nom"
  );

    //L'opérateur combineLatest prend un tableau d'Observables en argument.Il attend que chaque 
    //Observable ait émis au moins une fois, et puis, à chaque émission d'un des Observables, 
    //émet les dernières émissions de tous les Observables sous forme de tuple. Ici, vous aurez d'abord 
    //un tuple de cette forme : ['', 'lastName', [ tableau de tous les candidats ]] Du coup, vous 
    //pouvez utiliser la fonction Array.filter pour filtrer le tableau :


  this.candidates$ = combineLatest([
    search$,
    searchType$,
    this.candidatesService.candidates$
  ]).pipe(
    // filter candidates here
    map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
      .toLowerCase()
      .includes(search as string))
  ))
  //Dans le filter ici :nous regardons  candidate[searchType] , ce qui est l'équivalent de  
  //candidate.lastName si  searchType === 'lastName' , par exemple ;nous le passons en minuscules 
  //pour que la recherche ne soit pas sensible à la casse ; nous vérifions si l'attribut sélectionné 
  //contient la chaîne de caractères passée dans le champ de recherche. 
  //Le cast  search as string empêche TypeScript de râler parce qu'il n'arrive pas à identifier 
  //le type exact de search

  }

}
