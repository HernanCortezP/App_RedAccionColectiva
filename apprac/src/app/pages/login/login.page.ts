import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

@ViewChild('slidePrincipal') slides: IonSlides;



img1 = '/assets/osapi2.png';




loginUser = {
  email: 'jc@hotmail.com',
  password: '123'
};

registerUser: Usuario = {
   email: 'test',
   password: '123',
   nombre: 'MermaPrueba',
   avatar: 'av-1.png'

};

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true); // el this.slides hace referencia al nombre que se le asigno al viewChild arriba.
  }

 async registro(fRegistro: NgForm) {

    if (fRegistro.invalid) { return; }

    const valido = await this.usuarioService.registro(this.registerUser);

    if ( valido) {
      // navegar al tabs
     this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else { // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Ya existe una cuenta con ese correo');

    }

  }

 async login( fLogin: NgForm ) { // aqui se tiene qe obtener la info el email y pass, del servicio

    if (fLogin.invalid) { return; } // si el formulario del login es invalio q haga return y no siga

    // tslint:disable-next-line:max-line-length
    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password ); // esta por defecto devuelve una promesa, por el metodo login del servicio

    if ( valido) {
      // navegar al tabs
     this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else { // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Usuario/Contraseña no son correctos.');

    }

  }






  mostrarRegistro() {

this.slides.lockSwipes(false);
this.slides.slideTo(0); // el Slide 0 es el primero
this.slides.lockSwipes(true);

  }

mostrarLogin() {

this.slides.lockSwipes(false);
this.slides.slideTo(1); //  el Slide 1 es el segundo
this.slides.lockSwipes(true);

}

}
