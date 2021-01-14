import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // guestCartData: any;
  // userCartData: any;
  cartData: any;
  itemCount:number = 0;
  totalCost:number = 0;
  userDetails: any;
  userData: any;
  userId: any;
  currentUserName: any;
  currentUserWalletAmount: number = 0;
  showNav: boolean = false;
  userLoggedIn: boolean = false;
  cartLength: number;
  dropDownButton:boolean = false;
  cartItem:any;

  chatConnect: boolean = true;

  constructor(private cartService: CartService, private usersService: UserService, 
    private router: Router, private activatedRoute: ActivatedRoute) { 
    
  }

  ngOnInit() {

    console.log('header');

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
            console.log(this.userData);
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
                this.itemCount++;
                this.totalCost = this.totalCost + userCartElement.price;
              });
            });
          });
        }
        console.log(this.userLoggedIn);
  }

  userLogOut(){
    this.userLoggedIn = false;
    console.log(this.userId, this.userLoggedIn);
    sessionStorage.clear();
    console.log(this.userId, this.userLoggedIn);
    sessionStorage.setItem('flag', 'set');      //flag to reload the header upon updation of header content
    this.router.navigate(['/login']);
    
  }

  removeElement(cartOrder){
    console.log(cartOrder);
    if(this.userLoggedIn === true){
      let cartElement = {orderId: cartOrder._id, userId: this.userId, name:cartOrder.name}
      this.cartService.deleteOneFromUserCart(cartElement).subscribe( (response:{status: boolean, msg: string}) => {
        console.log(response);
        window.location.reload();
      });
    }
    else{
      let cartElement = {orderId: cartOrder._id, name:cartOrder.name}
      this.cartService.deleteOneFromGuestCart(cartElement).subscribe( (response:{status: boolean, msg: string}) => {
        console.log(response);
        window.location.reload();
      });
    }
  }

  clearCart(){
    console.log('clearCart');
    if(this.userLoggedIn === true){
      this.cartService.deleteAllFromUserCart(this.userId).subscribe( (response:{status: boolean, msg: string}) => {
        console.log(response);
        window.location.reload();
      });
    }
    else{
      this.cartService.deleteAllFromGuestCart().subscribe( (response:{status: boolean, msg: string}) => {
        console.log(response);
        window.location.reload();
      });
    }
  }

  checkOut(){
    console.log('check out clicked!');
    this.router.navigate(['/check-out']);
  }



  addPizza(pizza){

    if(this.userLoggedIn === false){
      
      let guestCartData = {
        name: pizza.name,
        price: pizza.price,
        image: pizza.image
      }

      console.log(guestCartData);
      this.cartService.setGuestCart(guestCartData).subscribe( (response:{status: boolean, msg:string}) => {
        if(response.status === true){
          console.log(response.msg);
        }
        else{
          console.log(response.msg);
        }
        window.location.reload();
      });
    }
    else{
      let userCartData = {
        userId: this.userId,
        name: pizza.name,
        price: pizza.price,
        image: pizza.image
      }

      console.log(userCartData);
      this.cartService.setUserCart(userCartData).subscribe( (response:{status: boolean, msg:string}) => {
        if(response.status === true){
          console.log(response.msg);
        }
        else{
          console.log(response.msg);
        }
        window.location.reload();
      });
    }
    
  }


  dropDownIngredients(cartItem){
    this.cartItem = cartItem;
    this.dropDownButton = true;
  }

  pullUpIngredients(cartItem){
    this.dropDownButton = false;
    return true;
  }

  goToUserProfile(){
    if(this.userLoggedIn === true){
      this.router.navigate(['/user-profile']);
    }
  }

  respReceivedFromChat(eventArg){
    console.log(eventArg);
    if(eventArg === 'close'){
      this.chatConnect = false;
    }
  }

}
