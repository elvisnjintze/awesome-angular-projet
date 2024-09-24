import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/posts.models';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule,PostListItemComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  posts$!: Observable<Post[]>
  //on crée un constructeur avec la route actve(l'url active)
  //où nuos allons recupérer les données portant la cl' posts
  //ensuite nous avons l'ensemble des données potsServices (tableau)
  //sur lequel nous allons appeler la methode addNewcomment pour 
  //ajouter un commentaire à un post donné
  constructor(private route: ActivatedRoute, private postsService: PostsService){}

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(map(data=>data['posts']))
  }
  //cette méthode permet de recupérer un commentaire posté sur le
  //comment enfant PostListItemComponent avec la directive @Ouput
  onPostCommented(postCommented:{comment:String, postId:number}):void{
    this.postsService.addNewComment(postCommented);
  }
}
