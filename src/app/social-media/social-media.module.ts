import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostsService } from './services/posts.service';
import { PostsResolver } from './resolvers/posts.resolver';
import { CoreModule } from '../core/core.module';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,CoreModule
  ],
  //Puisque SocialMediaModule est lazy-loaded et que PostsService
  // ne sert qu'à l'intérieur de SocialMediaModule, ça ne nous 
  //intéresse pas que ce service soit chargé à la racine de 
  //l'application. On voudrait qu'il soit lié uniquement au 
  //module où il sert.

//Pour cela, vous allez ajouter un tableau providers à 
//SocialMediaModule :


  
  providers: [PostsService,PostsResolver]
})
export class SocialMediaModule { }
