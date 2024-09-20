import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/posts.models';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule,PostListItemComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  posts$!: Observable<Post[]>

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(map(data=>data['posts']))
  }

}
