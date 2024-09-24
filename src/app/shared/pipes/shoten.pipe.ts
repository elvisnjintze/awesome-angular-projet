//Nous allons crée un pipe qui permettra de tronqué un texte de plus de 
//Pour utiliser un Pipe dans l'application, il faut le déclarer.
// Ajoutez-le aux déclarations de SharedModule, ainsi 
//qu'aux exports pour le rendre disponible à toute l'application :
import { Pipe, PipeTransform } from "@angular/core";

//50 caractère en un texte de 50 caractére
@Pipe({
    name:'shorten'
})
export class ShortenPipe implements PipeTransform{
    transform(value: String, maxlenght=50): String {
        if (value.length <= maxlenght){
            return value
        }
        return (value.substring(0,maxlenght)+' ...')
    }
}