import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [HeaderComponent],
  //Vous aurez besoin du HttpClient pour envoyer des requêtes 
  //au serveur. Puisque HttpClientModule ne sera importé 
  //qu'une fois dans l'application, c'est un candidat parfait 
  //pour être importé dans CoreModule :
  imports: [CommonModule,SharedModule,RouterModule,HttpClientModule],
  exports: [HeaderComponent]
})
export class CoreModule { }
