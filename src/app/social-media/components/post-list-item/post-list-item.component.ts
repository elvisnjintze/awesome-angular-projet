import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/posts.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent implements OnInit{
  @Input() post!: Post
  constructor(){}
  ngOnInit(): void {
    
  }

}
