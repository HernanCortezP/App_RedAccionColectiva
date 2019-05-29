import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  // @ViewChild(IonSlides) slides: IonSlides; // para que al cambiar la orientacion no se vean mal los slides

   // @HostListener('window:resize')        // para que al cambiar la orientacion no se vean mal los slides
   //  onResize() {
    // setTimeout(() => this.slides.update(), 100);
   // }

  // tslint:disable-next-line:member-ordering
  @Input() post: Post = {};





  constructor() { }

  ngOnInit() {}

}
