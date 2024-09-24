import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/posts.models";
import { environment } from "../../../environments/environment.prod";

@Injectable ()
//Comme vous pouvez le constater, vous n'ajoutez pas  
//{ providedIn: 'root' }  au décorateur  @Injectable() .

//Puisque SocialMediaModule est lazy-loaded et que 
//PostsService ne sert qu'à l'intérieur de SocialMediaModule, 
//ça ne nous intéresse pas que ce service soit chargé à la racine
// de l'application. On voudrait qu'il soit lié uniquement au
// module où il sert.

//Pour cela, vous allez ajouter un tableau providers à 
//SocialMediaModule 
export class PostsService{
    constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    //Nous pourrions nous arrêter là, avec l'URL codée en dur,
    // mais je  propose une autre approche : enregistrer la 
    //racine de l'URL du backend dans une variable environnement.
    //return this.http.get<Post[]>('http://localhost:3000/posts');
    // avec le repertoire environments et les fichiers environment.ts
    //et environment.prod.ts que nous avons crée et rempli
    return this.http.get<Post[]>(`${environment.apiUrl}posts`);
  }
  addNewComment(postCommented:{comment:String,postId:number}):void{
    //cette fonction permet l'ajout d'un commentaire et il sera appelé
    //depuis le component PostListComponent
    console.log(postCommented)
  }
}