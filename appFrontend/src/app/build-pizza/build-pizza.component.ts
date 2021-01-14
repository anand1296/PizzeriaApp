import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.css']
})
export class BuildPizzaComponent implements OnInit {

  ingredientList: any;
  totalCost: number = 0;
  basePrice:number = 200;
  grandTotal: number = 0;
  userId: any;
  userLoggedIn: boolean = false;
  customPizzaIngredients: string = '';
  ingredientsArray: Array<string>;

  constructor(private ingredientsService: IngredientsService, private cartService: CartService) { }

  ngOnInit() {
    this.ingredientsArray = [];
    this.ingredientsService.getIngredients().subscribe( (response:{status: boolean, msg: string, ingredients: []}) => {
      this.ingredientList = response.ingredients;
      console.log(this.ingredientList);

      this.userId = sessionStorage.getItem('userId');
      if(sessionStorage.getItem('isLoggedIn') === 'true'){
        this.userLoggedIn = true;
      }
      else{
        this.userLoggedIn = false;
      }
    });

  }

  onCheckIngredient(ingredient, ingredientPrice:number, ingredientChecked){
    console.log(ingredient);
    console.log(ingredientPrice);
    console.log(ingredientChecked);
    if(ingredientChecked){
      this.totalCost = this.totalCost + ingredientPrice;
      this.ingredientsArray.push(ingredient.tname);
      console.log(this.ingredientsArray);
    }
    else{
      this.totalCost = this.totalCost - ingredientPrice;
      console.log(this.ingredientsArray.indexOf(ingredient.tname));
      this.ingredientsArray.splice(this.ingredientsArray.indexOf(ingredient.tname), 1); //////////to delete one/more item from an array starting from a given index
      console.log(this.ingredientsArray);
    }

    this.grandTotal = this.totalCost + this.basePrice;

    
  }

  buildPizza(){
    console.log('build pizza');
    if(this.userLoggedIn === false){
      
      let guestCartData = {
        name: 'my custom pizza',
        price: this.grandTotal,
        image: 'https://image.shutterstock.com/image-photo/traditional-italian-pizza-vegetables-ingredients-600w-795649972.jpg',
        ingredients: this.ingredientsArray
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
        name: 'my custom pizza',
        ingredients: this.ingredientsArray,
        price: this.grandTotal,
        image: 'https://image.shutterstock.com/image-photo/traditional-italian-pizza-vegetables-ingredients-600w-795649972.jpg'
        
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
