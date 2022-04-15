import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse, Images } from '../interfaces/gifs.interface';

@Injectable({
  // Genera nuestro servicio de manera global para poder ser utilizado dentro del todo el proyecto
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl: string='https://api.giphy.com/v1/gifs';


  private apiKey:string = 'Aa5slhDocx3VtiolKUSS34W2M5Yfyn3x';

  //Generamos una varible de tipo privada para almacenar la información ingresada
  private _historial: string[] = [];

  //Exportamos el tipo de arreglo que será la variable "resultados" de nuestra interfaz
  public resultados: Gif[] = [];

  public imagenes: Images[] = [];

  get historial(): string[] {
    
    // Se colocan las llaves cuadras para especificar que es de tipo arreglo
    // Se colocan los "..." para indicar que el metodo es un operador spread, es decir, 
    //separa los elementos diferentes que tiene esté arreglo y crea uno nuevo
    return [...this._historial];
  }

  //Creamos un constructor que espera un parametro privado de nuestro cliente HTTP
  //El constructor al solamente ejecutarse una sola vez puede ser utilzado para ingresar el llamado de nuestro servicio de localStorage
  constructor(private http: HttpClient){

    // Tratamos de ingresar a los datos guardados dentro de la varible "historial" pero no te deja de la siguiente manera por los tipos de datos de ambas variables
    // this._historial = localStorage.getItem('historial');
    
    //Primero comprobamos que nuestro historial tenga contenido guardado previamente
    // if( localStorage.getItem('historial') ){
      //Utilizamos la extension "parse" de la herramienta "JSON" la cual toma un objetivo serializado y lo regresa al tipo de dato que era (tipo objeto)
      // Anexamos el signo "!" al final para confimar la instrucción dada anteriormente
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

    //Esto es una forma más sencilla de hacer lo anterior
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  
  //Creamos una función para poder almancenar la busqueda ingresada
  buscarGifs( query: string = ''){
    //Utilizamos el "trim" para cortar los espacios en un principio o al final que pueda tener la cadena
    //Utilizamos el "toLocaleUpperCase" para pasar toda la cadena a minusculas
    query = query.trim().toLocaleUpperCase();

    //Se valida que si el arreglo no tiene el valor que se quiere agregar esté se agregará
    if( !this._historial.includes(query) ){
      //Se agrega el valor de la busqueda a la cadena
      this._historial.unshift( query );
      // console.log(this._historial);

      //Cortamos el historial con el "splice" del primero al número diez
      this._historial = this._historial.splice(0,10);

      //Guardaremos la informacion con "LocalStorage" de manera local para que cada vez que hagamos un refresh a la página está se almacene de manera temporal
      // Utilizaremos la función "JSON" con la extensión ".stringify" la cual convierte la variable "_historial" de tipo cadena a tipo string
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // if( !this.resultados.includes(resp.data) ){
        
    //   this.resultados.unshift(resp.data);
    //   this.resultados = this.resultados.splice(0,10);
    //   localStorage.setItem('resultados', JSON.stringify(this.resultados));
    // }

    const params = new HttpParams()
                      .set('api_key', this.apiKey)
                      .set('limit','10')
                      .set('q', query);
         
    // console.log(params.toString());                  


    //Utilizamos la variable "http" declarada en nuestro constructor para obtener la información referente a la busqueda ingresada y mostramos los diez resultados de está
    //Utilizamos la interfaz exportada para especificar el tipo de archivo que tendrá nuestra busqeda
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl}/search`, {params})
    .subscribe( (resp:any) => {
      console.log(resp.data);
      this.resultados = resp.data;


      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      // if( this.resultados.includes(resp.data)){
      //   this.resultados.unshift(resp.data);
      //   this.resultados = this.resultados.splice(0,10);
      //   localStorage.setItem('resultados', JSON.stringify(this.resultados));
      // }
      
    })

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=Aa5slhDocx3VtiolKUSS34W2M5Yfyn3x&q=dragon ball z&limit=10')
    // .then( resp => {
    //   resp.json().then(data => {
    //     console.log(data);
    //   })
    // })

  }

  
}
