import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {
  
// Decorador ViewChild busca en el documento html la referencia local establecida como parametro
// Se coloca el signo de "!" conocido como notNullAssessionOperation o un operador para asegurarse de que el objeto no es núlo
// Se implementa el "HTMLInputElement" para anexa el tipo de referencia al "ElementRef"
@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; 

//Importamos nuestro servicio
  constructor( private gifsService: GifsService){
    
  }

  //recibimos de parametro lo que se tenga en la variable local
  buscador( ){
    
    const valor = this.txtBuscar.nativeElement.value;
    // console.log(value);

    //Controlamos la busqueda, en este caso si se ingresa una cadena vacia no hacer nada
    if(valor.trim().length === 0){
      return;
    }

    //Le mandamos a nuestro servicio la palabra a buscar
    this.gifsService.buscarGifs( valor ); 

    this.txtBuscar.nativeElement.value = '';

    // console.log( termino );
    // console.log( this.txtBuscar )

  }

}
