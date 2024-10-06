/***Dans votre dossier  validators , créez  confirm-equal.validator.ts .
Ce Validator devra être placé sur un FormGroup et non sur un FormControl.
Pourquoi ? Parce qu'il a besoin d'avoir accès à deux FormControls,
enfants du FormGroup.Du coup, l'implémentation que je vous propose 
est la suivante  */
/**Le Validator requiert deux paramètres : les noms des deux champs à vérifier.
D'abord, vous vérifiez que les deux champs existent. Sinon, vous retournez une
erreur.Ce texte d'erreur est surtout à destination des développeurs pour
leur expliquer qu'ils ont mal implémenté le Validator !Ensuite, si les 
deux champs contiennent des valeurs égales, vous retournez  null : 
sinon, vous retournez une erreur qui contient les deux valeurs 
comparées.Le Validator est prêt ! Vous pouvez donc l'appliquer aux deux 
FormGroups emailForm  et  loginInfoForm  , en passant un deuxième 
argument à  FormBuilder.group  :*/
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmEqualValidator(main: string, confirm: string): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        if (!ctrl.get(main) || !ctrl.get(confirm)) {
            return {
                confirmEqual: 'Invalid control names'
            };
        }
        /*const mainValue = ctrl.get(main)!.value;
        const confirmValue = ctrl.get(confirm)!.value;*/
    
         // Abonnement aux changements de valeur pour forcer la validation
         ctrl.get(main)!.valueChanges.subscribe(() => ctrl.get(confirm)!.updateValueAndValidity());

         const mainValue = ctrl.get(main)!.value;
         const confirmValue = ctrl.get(confirm)!.value;
 

        return mainValue === confirmValue ? null : {
            confirmEqual: {
                main: mainValue,
                confirm: confirmValue
            }
        };
    };
}