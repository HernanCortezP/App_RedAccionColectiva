import { Injectable } from '@angular/core';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario: Usuario = {};  // este objeto tomara los valores que vienen en el token
  token: string = null;

  constructor(private http: HttpClient,
              private storage: Storage,
              private navCtrl: NavController) { }


login(email: string, password: string) {

  const data = {email, password};

  return new Promise ( resolve => { // aqui se le indica que esta funcion retornara una promesa para arreglar el problema de abajo

    this.http.post(`${URL}/user/login`, data)
    .subscribe(async resp => { // como se maneja el subcribe aqui, este no es retornado cuando alguien se autentica
     console.log(resp);

     // tslint:disable-next-line:no-string-literal
     if ( resp['ok'] ) {
         // tslint:disable-next-line:no-string-literal
    await this.guardarToken( resp['token'] );
    resolve(true);
     } else {
       this.token = null;
       this.storage.clear();
       resolve(false);
     }

    });

  });

}

logout() {
  this.token   = null;
  this.usuario = null;
  this.storage.clear();
  this.navCtrl.navigateRoot('/login', { animated: true });
}

getUsuario() { // retornara la info del usuario si existe, sino tendra q ser verificado pq puede que este en el token

  if (!this.usuario._id) {
    this.validaToken();
  }

  return { ...this.usuario };

}

async guardarToken(token: string) { // el token es el q se tiene q guardar en el storage

this.token = token; // el segundo "token" es el qe esta declarado como argumento u parametro en la funcion.
await this.storage.set('token', token);

await this.validaToken();

}

registro( usuario: Usuario ) {

  return new Promise (resolve => {

    this.http.post(`${URL}/user/create`, usuario)
    .subscribe(async resp => { // como se maneja el subcribe aqui, este no es retornado cuando alguien se autentica
     console.log(resp);

     // tslint:disable-next-line:no-string-literal
     if ( resp['ok'] ) {
         // tslint:disable-next-line:no-string-literal
     await this.guardarToken( resp['token'] );
     resolve(true); // si la promesa se hace bien quiere decir que si lo creó y puedo navegar a la sig interfaz
     } else {
       this.token = null;
       this.storage.clear();
       resolve(false);
     }

    });

  });

}

 async cargarToken() {

  this.token = await this.storage.get('token') || null;

}

 async validaToken(): Promise<boolean> {

  await this.cargarToken();

  if (!this.token) {  // si no existe el token en el storage no deja entrar
    this.navCtrl.navigateRoot('/login');
    return Promise.resolve(false);
  }

// Si existe el token que continue con la verificacion normal

  return new Promise<boolean>(resolve => {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    this.http.get(`${URL}/user/`, {headers})
    .subscribe( resp => {

      // tslint:disable-next-line:no-string-literal
      if ( resp['ok'] ) { // si el token es valido podra continuar

        // tslint:disable-next-line:no-string-literal
      this.usuario = resp['usuario'];
      resolve(true);

      } else {
        this.navCtrl.navigateRoot('/login');
        resolve(false);

      }

    });
  });

}

actualizarUsuario(usuario: Usuario) {

  const headers = new HttpHeaders({
    'x-token': this.token
  });


  return new Promise(resolve => {

    // aqui le mandamos a la ruta de la api de actualizar, la data del usuario seguido de los parametros ene ste caso el token
    this.http.post(`${URL}/user/update`, usuario, {headers})
    .subscribe( resp => {  // resp es lo que me devuelve la api, el true = ok y el token.

      // tslint:disable-next-line:no-string-literal
      if ( resp['ok'] ) {
        // tslint:disable-next-line:no-string-literal
        this.guardarToken(resp['token']); // actualiza el token actual de la actualizacion del perfil y lo guarda en el storage
        resolve(true);
      } else {
        resolve(true);

      }

  });





  });


}

}
