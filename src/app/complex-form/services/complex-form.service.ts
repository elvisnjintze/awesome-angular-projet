import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComplexFormValue } from "../models/complex-form-value.model";
import { catchError, delay, mapTo, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class ComplexFormService{
    constructor(private http:HttpClient){}
    saveUserInfo(formValue: ComplexFormValue): Observable<boolean>{
        return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
            mapTo(true),
            delay(1000),
            catchError(()=>of(false).pipe(
                delay(1000)
            ))
            //Cette méthode :       
             //utilisemapTo  pour transformer toute réponse du serveur 
             //(et donc émission de l'Observable) en true  , peu importe
             // la valeur de la réponse ;
            //retarde cette réponse d'une seconde pour simuler un délai de 
             //réseau ;
            //en cas d'erreur, émet  false  (également retardé d'une seconde
            //catchError  est un opérateur extrêmement utile pour la gestion d'erreur. 
            //Il permet de faire en sorte que l'Observable retourne quand même 
            //une valeur au lieu d'émettre une erreur.
            //Dans ce cas, il fera en sorte que l'Observable final retourné par 
            // saveUserInfo  retourne simplement la valeur  false  si le serveur
            // répond avec une erreur.
            //Attention, il faut que  catchError  retourne un Observable.
            //L'idée avec cette méthode est de recevoir un message  true  pour
            // une requête réussie, ou  false  pour une requête échouée.
            //Il ne reste plus qu'à ajouter ce nouveau service aux  providers 
            // de ComplexFormModule :


        )
    }
}