//Je vous propose d'essayer d'implémenter vous-même ce prochain Pipe qui :
//acceptera un objet de type  { firstName: string, lastName: string }  ;
//retournera    "LASTNAME Firstname"  . 
//Par exemple, l'objet  { lastName: 'Alexander', firstName: 'Will' }  
//doit retourner  'ALEXANDER Will'
import { Pipe, PipeTransform } from "@angular/core";

//50 caractère en un texte de 50 caractére
@Pipe({
    name:'usernamepipe'
})
export class LastNameFirstName implements PipeTransform{
    transform(value: { firstName: string, lastName: string }, locale: 'en' | 'fr' = 'fr'): string {
        return locale === 'fr' ?
          `${value.lastName.toUpperCase()} ${value.firstName}` :
          `${value.firstName} ${value.lastName}`;
        
    }
}