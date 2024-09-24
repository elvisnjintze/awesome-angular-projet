import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/posts.models';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { CommentsComponent } from '../../../shared/components/comments/comments.component';


@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [CommonModule,MatCardModule,SharedModule],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss',
  
})
export class PostListItemComponent implements OnInit{
  @Input() post!: Post
  tempuser={lastName:"njinte",firstName:"elvis william"}
  //nous allons émettre un évènement qui sera envoyé au parent de ce component
  //PostListComponent et cet évènement sera porté
  //par un objet appelé postCommented et sera déclenché par la méthode
  //onNewComment qui est aussi une méthode déclenché dans le component
  //enfant CommentsComponent à traves la méthode onLeaveComment
  //déclenchée lors de l'appuie du boutton d'envoi de commentaire
  @Output() postCommented = new EventEmitter<{comment: String, postId: number}>();
  constructor(){}
  ngOnInit(): void {
    
  }
  onNewComment(comment:String):void{
    this.postCommented.emit({comment:comment, postId:this.post.id})

  }

}
