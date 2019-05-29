import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera} from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(), // el forRoot se utiliza en angular para decir que eso es una coleccion de srvicios
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot() // se importa el ionicStorage Modulo para poder usar el Storage local
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,   // Servicio para la geoloc, colocar aqui despues de haber instalado el plugin
    Camera,
    FileTransfer, // para subir las imagenes al servidor
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
