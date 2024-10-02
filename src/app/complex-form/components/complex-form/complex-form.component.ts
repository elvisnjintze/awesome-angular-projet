import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-complex-form',
  standalone: true,
  imports: [SharedModule,CommonModule,ReactiveFormsModule,MatFormField,],
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
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initFormControls()
    this.initMainForm()
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
  //usqu'ici, tout ce que vous avez passé à  FormBuilder.group , c'étaient 
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

  onSubmitForm():void{}

}
