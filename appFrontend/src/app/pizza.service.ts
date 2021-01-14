import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  baseUrl = 'http://localhost:3010';

  constructor(private httpClient: HttpClient) { }

  getPizza(){
    return this.httpClient.get(this.baseUrl+'/get-pizza');  
  }

}
