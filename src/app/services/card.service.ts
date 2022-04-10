import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService 
{
   private AppUrl = 'https://localhost:7034/';
   private ApiUrl = 'api/Card/';
  
  constructor(private http: HttpClient) 
  {

  }

  GetListCard(): Observable<any>
  {
    return this.http.get(this.AppUrl + this.ApiUrl);
  }

  DeleteCard(id: number): Observable<any>
  {
     return this.http.delete(this.AppUrl + this.ApiUrl + id)
  }


  SaveCard(tarjeta: any): Observable<any>
  {
     return this.http.post(this.AppUrl + this.ApiUrl,tarjeta)
  }

  UpdateCard(id: number, tarjeta: any): Observable <any>
 {
    return this.http.put(this.AppUrl + this.ApiUrl + id,tarjeta)
 }

}
