import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any; // para q no salga el error del mapboxgl

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

@Input() coords: string;
@ViewChild('mapa') mapa;  // lo q esta en apostrofes es la referencia local q se puso en el html con el # lo azul el nombre q querramos

  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(','); // objeto que tendra en la primera pocision la latitud y en la segunda la longitud
    const lat = Number(latLng[0]); // se transforma a numero la latitud y arriba se concatena con la longitud
    const lng = Number(latLng[1]); // se transforma a numero la longitud y arriba se concatena con la latitud


    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlcm5hbiIsImEiOiJjanc0b2RkZmkwcWQ4M3pzMGx2YTd6eGh2In0.NRRB8RAt_e9gyCJz6hLPUg';
    const map = new mapboxgl.Map({
        container: this.mapa.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat], // este se agrega es lo que esta esperando el mapa, viene en la documentacion de mapbox
        zoom: 15

 });
    // para el marcador
    const marker = new mapboxgl.Marker()
      .setLngLat( [lng, lat] ) // coordenadas donde estara el marcador, siempre poner primero la longitu
      .addTo(map);

  }

}
