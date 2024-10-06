/**Le paramètre  ctrl  est le FormGroup ou FormControl sur lequel ce 
 * Validator est placé. Dans ce Validator, vous regardez si la valeur 
 * du contrôle contient le texte  'VALID'  .Si oui, le Validator
 *  retourne  null . Un Validator retourne  null  lorsqu'il juge que le
 *  contrôle est valide. Sinon, le Validator retourne un objet. La clé 
 * de l'objet est le nom que vous voulez associer à l'erreur (qui sera 
 * retrouvée via  hasError , par exemple). Comme valeur, je vous propose
 *  de passer la valeur du champ. */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        if (ctrl.value.includes('VALID')) {
            return null;
        } else {
            return {
                validValidator: ctrl.value
            };
        }
    };
}