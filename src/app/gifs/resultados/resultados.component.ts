import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  //Obtenemos los resultados con la propiedad "get" de la funcion "resultados" de nuestro servicio
  get resultados(){
    return this.gifsService.resultados;
  }

  //Inicializamos nuestro constructor con el uso de nuestro servicio
  constructor(private gifsService: GifsService) { }

}
