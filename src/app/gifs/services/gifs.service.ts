import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _apiKey   : string   = 'N7bc36VOOigbpEQU412BGN88hKTqP9f6';
  private _apiUrl   : string   = 'https:api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public  resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];
  }

  buscarGifs( query: string ): void {
    query = query.trim().toLowerCase();

    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice( 0, 10 );

      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this._apiUrl}/search`, { params })
      .subscribe(( res ) => {

        this.resultados = res.data;
        localStorage.setItem('resultado', JSON.stringify( this.resultados ))

      });
  }
}
