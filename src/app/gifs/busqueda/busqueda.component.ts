import { Component, ElementRef, ViewChild } from '@angular/core';

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

  //recibimos de parametro lo que se tenga en la variable local
  buscador( ){
    
    const value = this.txtBuscar.nativeElement.value;
    console.log(value);

    this.txtBuscar.nativeElement.value = '';

    // console.log( termino );
    // console.log( this.txtBuscar )

  }

}
