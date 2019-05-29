import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any; // esto no afecta en nada a la app es solo para q no marque el error de tipado

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  cargandoGeo = false; // para saber cuando si se cargo la geolocalizacion por completo

  post = {
  mensaje: '',
  coords: null,
  posicion: false,
  tipo: ''
  };

  tempImages: string [] = [];

  constructor(private postService: PostsService,
              private route: Router,
              private geolocation: Geolocation,
              private camera: Camera) {
  }

  async crearPost() {

  console.log(this.post);
  const creado = await this.postService.crearPost(this.post);

  this.post = {
    mensaje: '',
    coords: null,
    posicion: false,
    tipo: ''
    };

  this.tempImages = [];

  this.route.navigateByUrl('/main/tabs/tab1');
}

getGeo() {

  if (!this.post.posicion) { // si no quiere poner la posicion
    this.post.coords = null;
    return;
  }

  this.cargandoGeo = true;

  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    this.cargandoGeo = false;
    const coords = `${resp.coords.latitude},${resp.coords.longitude}`;


    console.log(coords);
    this.post.coords = coords;

   }).catch((error) => {
     console.log('Error getting location', error);
     this.cargandoGeo = false; // si sucede un error tmb cancelar el spinner
   });



}

camara() {

  const options: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.CAMERA

  };

  this.procesarImagen(options);



}


libreria() {

  const options: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY

  };

  this.procesarImagen(options);

}

procesarImagen(options: CameraOptions) {

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):

    const img = window.Ionic.WebView.convertFileSrc(imageData); // aqui se genera el path de la imagen


    this.postService.subirImagen(imageData);

    this.tempImages.push( img );

   }, (err) => {
    // Handle error
   });
}

}
