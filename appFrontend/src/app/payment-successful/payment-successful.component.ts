import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css']
})
export class PaymentSuccessfulComponent implements OnInit {

  userLoggedIn: boolean = false;
  userId: any;
  userDetails: any;
  userAppWalletAmount: number = 0;
  msg: string = '';
  

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    if(sessionStorage.getItem('isLoggedIn') === 'true'){
      this.userLoggedIn = true;
      this.userId = sessionStorage.getItem('userId');
      console.log(this.userId);
      this.userService.getUserById(this.userId).subscribe( (response: {status: boolean, msg: string, user: []}) => {
        console.log(response.user);
        this.userDetails = response.user;
        console.log(this.userDetails[0]);
        this.userAppWalletAmount = this.userDetails[0].appWalletAmount;

      });
    }
    else{
      this.msg = 'Unable to display user details. Please login with valid user credentials!';
    }
  
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  goToOrderPizza(){
    this.router.navigate(['order-pizza']);
  }

}
