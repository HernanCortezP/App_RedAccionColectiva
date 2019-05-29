import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  posts: Post[] = [];

  habilitado = true;

constructor( private postsService: PostsService ) {}

ngOnInit() {

  this.siguientes();

  this.postsService.nuevoPost
  .subscribe(post => {

    this.posts.unshift(post);


  });
}


siguientes(event?, pull: boolean = false) {  // para el infinite scroll, el signo es para hacer el parametro opcional




   this.postsService.getPosts(pull)
  .subscribe(resp => {
    console.log(resp);
    this.posts.push(...resp.posts);


    if (event) { // si sucede el evento, se marca como completado
    event.target.complete();

    if (resp.posts.length === 0) {   // para que ya no cargue si no hay mas posts en el arreglo
      event.target.disabled = false;
    }
   }
 });
}

Recargar(event) { // para el Refresher
  this.habilitado = true;
  this.posts = [];
  this.siguientes(event, true); // aqui se le esta diciendo a la funcion de siguientes, que se esta cargando la pagina 1, para actualizar

}



}
