import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css']
})
export class OrderPizzaComponent implements OnInit {

  pizzaList: any;
  userDetails: any;
  userData: any;
  userId: any;
  userLoggedIn: boolean = false;


  constructor(private pizzaService: PizzaService, private cartService: CartService, 
    private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    if(sessionStorage.getItem('flag') === 'set'){
      location.reload();
      sessionStorage.setItem('flag', 'unset');
    }

    this.pizzaService.getPizza().subscribe( (response:{status: boolean, msg: string, pizza: []}) => {
      console.log(response);
      if(response.status == true){
        this.pizzaList = response.pizza;
        console.log(this.pizzaList);
      }

      this.userId = sessionStorage.getItem('userId');
      if(sessionStorage.getItem('isLoggedIn') === 'true'){
        this.userLoggedIn = true;
      }
      else{
        this.userLoggedIn = false;
      }

    });
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

}
