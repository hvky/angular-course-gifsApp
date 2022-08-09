import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) { }

  buscar(): void {
    const { nativeElement: { value } } = this.txtBuscar;  //* Desestructuracion
    if ( value.trim().length === 0 ) return

    this.gifsService.buscarGifs( value );
    this.txtBuscar.nativeElement.value = '';
  }

}
