import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.models';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MaterialModule,CommonModule,ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  animations: [trigger('listItem', [
    state('default', style({
      transform: 'scale(1)',
      'background-color': 'white',
      'z-index': 1
    })),
    state('active', style({
      transform: 'scale(1.05)',
      'background-color': 'rgb(201, 157, 242)',
      'z-index': 2
    })),
    transition('default => active', [
      animate('100ms ease-in-out')
    ]),
    transition('active => default', [
      animate('500ms ease-in-out')
    ]),
  ])]
})
export class CommentsComponent implements OnInit{
  @Input() comments!: Comment[]
  //à la différence de @input qui attent une liste de comment 
  //venant du parent postListItemComponent le @ouput
  //écoute un évènement et doit le renvoyer à postListItem
  //sous forme de string dans la variable: newComment
  
  //Un  EventEmitter  est un objet sur lequel on peut appeler 
  //la méthode  emit()  et qui, comme son nom l'indique, émet la
  // valeur qu'on lui passe sous forme d'événement.
  @Output() newComment = new EventEmitter<string>();
  //nous controlons que avant d'envoyer un commentaire qui ne soit pas vide 
  //qu'il soit requis et que sa taille minimale soit de 10 caractère
  commentCtrl!:FormControl
  listItemAnimationState: 'default' | 'active'='default'
  constructor(private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('',
      [Validators.required,
        Validators.minLength(10)]);
  }
  //Dans le cas de CommentsComponent, l'objectif sera d'émettre 
  //le commentaire laissé par l'utilisateur. Vous pouvez donc 
  //implémenter  onLeaveComment()  :
  onLeaveComment():void{
    if (this.commentCtrl.invalid) {
      return;
  }
  this.newComment.emit(this.commentCtrl.value);
  this.commentCtrl.reset();
  }
  onListItemMouseEnter():void{
    this.listItemAnimationState = 'active'
  }
  onListItemMouseLeave():void{
    this.listItemAnimationState = 'default'
  }
}
