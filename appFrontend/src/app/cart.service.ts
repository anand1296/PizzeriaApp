import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public guestCart = [];
  baseUrl = 'http://localhost:3010';

  constructor(private httpClient: HttpClient) { }

  getGuestCart(){
    return this.httpClient.get(this.baseUrl+'/get-from-guestCart');
  }

  setGuestCart(cartData){
    return this.httpClient.post(this.baseUrl+'/add-to-guestCart', cartData);
  }

  getUserCart(userId){
    return this.httpClient.get(this.baseUrl+'/get-from-userCart/'+userId);
  }

  setUserCart(cartData){
    console.log(cartData);
    return this.httpClient.post(this.baseUrl+'/add-to-userCart', cartData);
  }

  deleteOneFromGuestCart(guestCartElement){
    console.log('guestCartElement : '+guestCartElement);
    return this.httpClient.post(this.baseUrl+'/delete-one-from-guestCart', guestCartElement);
  }
  deleteAllFromGuestCart(){
    console.log('/delete-all-from-guestCart : cartService');
    return this.httpClient.get(this.baseUrl+'/delete-all-from-guestCart');
  }


  deleteOneFromUserCart(userCartElement){
    console.log(userCartElement);
    return this.httpClient.post(this.baseUrl+'/delete-one-from-userCart', userCartElement);
  }
  deleteAllFromUserCart(userId){
    return this.httpClient.post(this.baseUrl+'/delete-all-from-userCart', {userId: userId});
  }

}
