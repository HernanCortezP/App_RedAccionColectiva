import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { reject } from 'q';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

nuevoPost = new EventEmitter<Post>(); // para cuando se crea un nuevo post se ponga en el home automaticamente a lo primero

  paginaPosts = 0;

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService,
              private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false) {

    if ( pull ) {
      this.paginaPosts = 0;

    }

    this.paginaPosts ++;

    return this.http.get<RespuestaPosts>(`${ URL }/posts/?pagina=${ this.paginaPosts }`);

  }

  crearPost(post) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {

      this.http.post(`${ URL }/posts`, post, {headers})
      .subscribe( resp => {

       console.log(resp);

       // tslint:disable-next-line:no-string-literal
       this.nuevoPost.emit(resp['post']);
       resolve(true);

      });
    });


  }

  subirImagen( img: string ) {

    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${ URL }/posts/upload`, options )
      .then( data => {
        console.log(data);
      }).catch( err => {
        console.log('error en carga', err);
      });

  }


}


