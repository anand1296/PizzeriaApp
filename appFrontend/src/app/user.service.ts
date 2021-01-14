import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = 'http://localhost:3010';
  
  constructor(private httpClient: HttpClient) { }


  validateUser(user){
    return this.httpClient.post(this.baseUrl+'/validate-user', user);
  }

  registerUser(user){
    return this.httpClient.post(this.baseUrl+'/register-user', user);
  }

  getUserByName(userName){
    return this.httpClient.get(this.baseUrl+'/get-user-byName/'+userName);
  }

  getUserById(userId){
    console.log(userId);
    return this.httpClient.get(this.baseUrl+'/get-user-byId/'+userId);
  }

  getUserCount(){
    return this.httpClient.get(this.baseUrl+'/get-userCount');
  }

  updateUserWalletBalanceAfterPayment(updatedUserInfo){
    console.log(updatedUserInfo);
    return this.httpClient.post(this.baseUrl+'/update-user-wallet-balance-after-payment', updatedUserInfo);
  }

  updateUserWalletBalanceAfterTopUp(updatedUserInfo){
    console.log(updatedUserInfo);
    return this.httpClient.post(this.baseUrl+'/update-user-wallet-balance-after-topUp', updatedUserInfo);
  }

  updateUserInfo(userCreds){
    console.log(userCreds);
    return this.httpClient.post(this.baseUrl+'/update-user-info', userCreds);
  }

}
