import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService 
{
   //url del swager
   private AppUrl = 'https://localhost:7034/';

   //url de la api
   private ApiUrl = 'api/Card/';
  
  
  //Contructor para las peticiones http
  constructor(private http: HttpClient) 
  {

  }


  //Metodo para obtener los datos de la api
  GetListCard(): Observable<any>
  {
    return this.http.get(this.AppUrl + this.ApiUrl);
  }

  
  //Metodo para guardar los datos 
  SaveCard(tarjeta: any): Observable<any>
  {
     return this.http.post(this.AppUrl + this.ApiUrl,tarjeta)
  }


  //Metodo para actualizar los datos
  UpdateCard(id: number, tarjeta: any): Observable <any>
 {
    return this.http.put(this.AppUrl + this.ApiUrl + id,tarjeta)
 }


  //Metodo para eliminar 
  DeleteCard(id: number): Observable<any>
  {
     return this.http.delete(this.AppUrl + this.ApiUrl + id)
  }



}
