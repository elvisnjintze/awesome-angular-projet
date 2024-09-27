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
    transition('void => *', [
      style({
          transform: 'translateX(-100%)',
          opacity: 0,
          'background-color': 'rgb(201, 157, 242)',
      }),
      animate('500ms ease-out', style({
          transform: 'translateX(0)',
          opacity: 1,
          'background-color': 'white',
      }))
  ])
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
  //e vous propose de créer un dictionnaire qui associe l'index 
  //du commentaire dans le tableau comments à son état :
  animationStates: { [key: number]: 'default' | 'active' } = {};

  //listItemAnimationState: 'default' | 'active'='default'
  constructor(private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('',
      [Validators.required,
        Validators.minLength(10)]);
        for (let index in this.comments) {
          this.animationStates[index] = 'default';
      }
  }
  //Dans le cas de CommentsComponent, l'objectif sera d'émettre 
  //le commentaire laissé par l'utilisateur. Vous pouvez donc 
  //implémenter  onLeaveComment()  :
  onLeaveComment():void{
    if (this.commentCtrl.invalid) {
      return;
  }
  // pour essayer une fonction d'animation particulière partant
  // du vide, on va faire quelque chose de particulier
  //ajouter un commentaire que nous n'allons pas enregistrer dans le serveur
  //avec cette suite de comande
  const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
        id: maxId + 1,
        comment: this.commentCtrl.value,
        createdDate: new Date().toISOString(),
        userId: 1
    });
  this.newComment.emit(this.commentCtrl.value);
  this.commentCtrl.reset();
  }
  onListItemMouseEnter(index:number):void{
    this.animationStates[index] = 'active'
  }
  onListItemMouseLeave(index:number):void{
    this.animationStates[index] = 'default'
  }
}
