import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shoten.pipe';
import { LastNameFirstName } from './pipes/lastnamefirtsname.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highligh.directice';

@NgModule({
  // nous avons conçu des pipes personalisés ShortenPipe
  //et LastNameFirstName que nous déclarons et exportons(dans)
  //pour etre utiliser dans toute l'application
  declarations: [ShortenPipe,LastNameFirstName,TimeAgoPipe,HighlightDirective],
  //nous avons enlevé MatCardModule des imports et des exports
  // pour remplacer avec le module MaterialModule
  // qui concentre toutes les modules Matérial que nous allons utilisé
  // tout au long de notre projet
  imports: [
    CommonModule, MaterialModule,CommentsComponent,ReactiveFormsModule
  ],
  //exports: [MatToolbarModule,MatCardModule,CommentsComponent
    exports:[CommentsComponent,MaterialModule,ReactiveFormsModule,ShortenPipe, LastNameFirstName,TimeAgoPipe,HighlightDirective]
  
})
export class SharedModule { }
