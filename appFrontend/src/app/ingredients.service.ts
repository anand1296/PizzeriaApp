import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  baseUrl = 'http://localhost:3010';

  constructor(private httpClient: HttpClient) { }

  getIngredients(){
    return this.httpClient.get(this.baseUrl+'/get-ingredients');
  }

}
