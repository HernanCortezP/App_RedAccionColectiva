import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';

@NgModule({
  declarations: [    // Aqui se declaran los componentes y arriba se tienen que importar
    PostComponent,
    PostsComponent,
    MapaComponent,
    AvatarSelectorComponent
  ],
  exports: [          // Aqui se tienen que exportar para poder ser usados fuera de este modulo, aqui solo expondremos al POSTS en otros
   PostsComponent,
   AvatarSelectorComponent

  ],
  imports: [
    CommonModule,
    IonicModule,  // se importa el modulo de ionic porq utilizaremos elementos de ionic para ser renderizados en los componentes.
    PipesModule   // Importamos el modulo del Pipe para poder ser utilizado y tratar las imagenes de los slides
  ]
})
export class ComponentsModule { }
