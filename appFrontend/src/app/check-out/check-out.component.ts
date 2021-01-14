import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {


  userId: any;
  userLoggedIn: boolean = false;
  currentUserName: any;
  cartData: any;
  userData: any;
  totalCost: number = 0;
  cartLength:number = 0;
  itemCount:number = 0;
  currentUserWalletAmount:number = 0;
  walletUpdateInfo: any;
  updatedUserInfo: any;
  msg: any;
  status: boolean = false;

  constructor(private cartService: CartService, private router: Router, private usersService: UserService) { }

  ngOnInit() {

    console.log('header');
    console.log('to reload header following latest updtations');
    if(sessionStorage.getItem('flag') === 'set'){
      location.reload();
      sessionStorage.setItem('flag', 'unset');
    }

    this.userId = sessionStorage.getItem('userId');
      if(sessionStorage.getItem('isLoggedIn') === 'true'){
        this.userLoggedIn = true;
      }
      else{
        this.userLoggedIn = false;
      }

      console.log(this.userId, this.userLoggedIn);

      if(this.userLoggedIn === false){
          console.log('guest logged in!');
          console.log(typeof(this.cartData));
          this.userLoggedIn = false;
          // this.usersService.setUserdetails('Guest');
          this.currentUserName = 'Guest';
          this.cartService.getGuestCart().subscribe( (response:{status:boolean, msg:string, result: []}) => {
            console.log(response);
            this.cartData = response.result;
            console.log(this.cartData);
            this.cartLength = this.cartData.length;
            console.log(this.cartLength);

            this.cartData.forEach(guestCartElement => {
              console.log(guestCartElement);
              this.itemCount++;
              this.totalCost = this.totalCost + guestCartElement.price;
            });
          });
        }
        else{
          console.log('user logged in!');
          this.userLoggedIn = true;
          console.log(this.userId);
          this.usersService.getUserById(this.userId).subscribe( (response:{status: boolean, msg: string, user: []}) => {
            console.log(response);
            this.userData = response.user;
            this.currentUserName = this.userData[0].userName;
            this.currentUserWalletAmount = this.userData[0].appWalletAmount;

            this.cartService.getUserCart(this.userId).subscribe( (response:{status:boolean, msg:string, result: []}) => {
              console.log(response);
              this.cartData = response.result;
              console.log(this.cartData);
              this.cartLength = this.cartData.length;
              console.log(this.cartLength);
              this.cartData.forEach(userCartElement => {
                console.log(userCartElement);
                console.log(userCartElement.ingredients.length);
                this.itemCount++;
                this.totalCost = this.totalCost + userCartElement.price;
              });
            });
          });
        }
        console.log(this.userLoggedIn);
        
  }


  makePayment(){
    console.log(this.currentUserWalletAmount);
    // this.currentUserWalletAmount = this.currentUserWalletAmount - this.totalCost;
    // console.log(this.currentUserWalletAmount);
    this.walletUpdateInfo = {userId: this.userId, appWalletAmount: this.currentUserWalletAmount, billAmount: this.totalCost};
    this.usersService.updateUserWalletBalanceAfterPayment(this.walletUpdateInfo).subscribe( (response: {status: boolean, msg: string, result: []}) => {
      this.updatedUserInfo = response.result;
      this.msg = response.msg;
      this.status = response.status;
      console.log(this.updatedUserInfo);
      if(response.status === true)
      {
        console.log('clearCart');
        if(this.userLoggedIn === true){
          this.cartService.deleteAllFromUserCart(this.userId).subscribe( (response:{status: boolean, msg: string}) => {
            console.log(response);
            // window.location.reload();
          });
        }
        else{
          this.cartService.deleteAllFromGuestCart().subscribe( (response:{status: boolean, msg: string}) => {
            console.log(response);
            // window.location.reload();
          });
        }
        console.log('Done!');
        this.router.navigate(['payment-successful']);
      }
      else{
        console.log('Could not check out!');
      }
    });
  }

}
