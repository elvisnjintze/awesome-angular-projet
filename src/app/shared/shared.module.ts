import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  //nous avons enlevé MatCardModule des imports et des exports
  // pour remplacer avec le module MaterialModule
  // qui concentre toutes les modules Matérial que nous allons utilisé
  // tout au long de notre projet
  imports: [
    CommonModule, MaterialModule,CommentsComponent,ReactiveFormsModule
  ],
  //exports: [MatToolbarModule,MatCardModule,CommentsComponent
    exports:[CommentsComponent,MaterialModule,ReactiveFormsModule]
  
})
export class SharedModule { }
