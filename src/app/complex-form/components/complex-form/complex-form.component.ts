import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../../shared/shared.module';
import { map, Observable, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';

@Component({
  selector: 'app-complex-form',
  standalone: true,
  imports: [SharedModule,CommonModule,ReactiveFormsModule],
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss'
})
export class ComplexFormComponent implements OnInit {
  mainForm!:FormGroup
  personalInfoForm!: FormGroup
  contactPreferenceCtrl!: FormControl
  //Il reste deux "groupes" de contrôles à générer : la partie  email 
   //et la partie  loginInfo  .Pour la partie  email , vous allez créer 
   //deux FormControls indépendants et un FormGroup
   //Vous allez ensuite initialiser les FormControls avant de générer le 
   //FormGroup à partir de ces FormControls :
   //Pourquoi cette approche ?
   //Parce que ça permet d'avoir la main facilement sur les contrôles 
   //(vous en aurez besoin pour gérer la validation, par exemple) et de 
   //traiter les deux contrôles ensemble – pour récupérer leurs valeurs
   // et pour les valider ensemble, par exemple.
   //Finalement, il s'agit de mélanger les avantages des FormGroups aux 
   //avantages des FormControls !
    emailCtrl!: FormControl
    confirmEmailCtrl!: FormControl
    emailForm!: FormGroup
    //Pour  loginInfo  , vous allez faire quelque chose de similaire,
    // mais qui regroupe toutes les approches que vous avez vues jusqu'ici !
    //Vous aurez besoin de pouvoir facilement manipuler  passwordCtrl  
    //et  confirmPasswordCtrl , mais pas username . Vous pouvez donc 
    //mélanger les approches, avec  username  comme contrôle simple et 
    //les contrôles de mot de passe comme des FormControls indépendants ! 
    passwordCtrl!: FormControl
    confirmPasswordCtrl!: FormControl
    loginInfoForm!: FormGroup //nous ne déclarons pas username ici car aucun control
    // n'est fait sur ce champ comme par exemple comparer les deux champs
    //paswordCtrl et confirmPaswordCtrl
  phoneCtrl!: FormControl
  //Nous utiliserons les Observables  valueChanges  pour modifier 
  //l'affichage et la validation du formulaire, et nous réagirons 
  //directement à la validité des champs pour afficher des messages 
  //d'erreur utiles à l'utilisateur.
  //une fois ces observables crées, il faut les initialiser avec la méthode
  //initFormObservables()que nous definirons
  showEmailCtrl$!: Observable<boolean>
  showPhoneCtrl$!: Observable<boolean>
  //Nous auron besoin d'un objet FormBuilder pour povoir construire 
  //notre formulaire (indispensable pour tous les formulaires)
  constructor(private formBuilder: FormBuilder,private complexFormService: ComplexFormService){}
  //cette variable permet de savoir si oui ou non le
  //formulaire est entrain d'etre chargé dans le serveur ceci afin
  //de créer une Progress-Bar qui va permettre de faire patienter l'user
  loading = false 
  ngOnInit(): void {
    this.initFormControls()
    this.initMainForm()
    this.initFormObservables()

  }
  
    
  
  initFormControls():void{
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required]
    })
    this.emailCtrl = this.formBuilder.control('')
    this.confirmEmailCtrl = this.formBuilder.control('')
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    })
    this.passwordCtrl = this.formBuilder.control('',Validators.required)
    this.confirmPasswordCtrl = this.formBuilder.control('',Validators.required)
    //nous contruisons alors le formgroup qui englobera le password
    //le confirmpassword et le username
    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
  });
    this.contactPreferenceCtrl = this.formBuilder.control('email')
    this.phoneCtrl = this.formBuilder.control('')

  }

  initMainForm():void{
    
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
  });
  //jusqu'ici, tout ce que vous avez passé à  FormBuilder.group , c'étaient 
  //des FormControls. Ici, vous passez également des FormGroups !
  //Avec ce montage, vous profitez pleinement des avantages des 
  //FormGroups et de ceux des FormControls :vous pouvez traiter des 
  //champs ensemble, pour la validation par exemple ;vous pouvez 
  //récupérer leurs valeurs sous forme d'objet unique ;vous manipulez 
  //facilement les contrôles auxquels vous avez besoin, par un accès 
  //rapide.Il ne reste plus qu'à créer le template en reliant les 
  //éléments HTML à leurs FormControls respectifs, et le montage créé 
  //ci-dessus vous offre plusieurs options.


}

private initFormObservables():void{
  //Nos deux Observables dépendent des changements du contrôle  
  //contactPreferenceCtrl  , donc générons-les à partir de ses  
  //valueChanges 
  this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
    startWith(this.contactPreferenceCtrl.value),
    map(preference => preference === 'email'),
    tap(showEmailCtrl=>this.setEmailValidators(showEmailCtrl))
    
);
this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
  startWith(this.contactPreferenceCtrl.value),
    map(preference => preference === 'phone'),
    //Puisque les changements de validation ont lieu lorsque 
    //l'utilisateur change son  contactPreference , nous pouvons
    //ajouter la logique nécessaire dans les pipes des Observables
    tap(showPhoneCtrl=>this.setPhoneValidators(showPhoneCtrl))
);
}

private setEmailValidators(showEmailCtrl: boolean){
  if (showEmailCtrl){
    this.emailCtrl.addValidators([
      Validators.required,//ce champ est obligatoire 
      Validators.email// ce champ doit avoir la syntaxe d'un email
    ])
    this.confirmEmailCtrl.addValidators([
      Validators.required,
      Validators.email
    ])
  }else{
    this.emailCtrl.clearValidators //quand il n'est pas selectionné il 
    //faut enlever les validators sinon le main-form ne sera jamais valide
    this.confirmEmailCtrl.clearValidators //quand il n'est pas selectionné il 
    //faut enlever les validators sinon le main-form ne sera jamais valide
  }
  this.emailCtrl.updateValueAndValidity
  this.confirmEmailCtrl.updateValueAndValidity
}

private setPhoneValidators(showPhoneCtrl: boolean){
  if (showPhoneCtrl){
    this.phoneCtrl.addValidators([
      Validators.required,//ce champ est pbligatoire
      Validators.minLength(9),//la longueur minimale
      Validators.maxLength(9)//la longueur max
    ])
  }else{
    this.phoneCtrl.clearValidators()//quand il n'est pas selectionné il 
  }//faut enlever les validators sinon le main-form ne sera jamais valide
  this.phoneCtrl.updateValueAndValidity()//sans ceci rien ne fonctionne

}
getFormControlErrorText(ctrl: AbstractControl) {
  if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
  } else if(ctrl.hasError('email')){
      return 'merci de renseigner une adresse valide';
        }else if(ctrl.hasError('maxlength')){
              return'ce numeros de téléphone contient trop de chiffres'
              }else if(ctrl.hasError('minlength')){
                  return 'ce numeros de téléphone contient moins de chiffres'
                  }else {
                      return 'Ce champ contient une erreur'
                        }
}

  onSubmitForm():void{
    this.loading = true
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved=>{
        this.loading = false
        if (saved){
          //Dans le cas d'un enregistrement réussi, vous réinitialisez
          // le formulaire (vous videz tous les champs). Il faut donc 
          //passer la valeur  'email'  à  contactPreferenceCtrl  pour 
          //retrouver le vrai état initial du formulaire.
          //La méthode  patchValue , par défaut, fait émettre 
          //l'Observable  valueChanges  du FormControl – la MatCard 
          //s'affichera, donc, et la validation sera ajustée correctement.
          this.mainForm.reset()
          this.contactPreferenceCtrl.patchValue('email')
        }else{
          console.log('l\'enregitrement du formulaire a échoué')
        }
      })
    ).subscribe()//il faut souscrire à cet observateur pour voir quelque chose
                 //se déroulerer
  }

}
