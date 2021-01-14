import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { BuildPizzaComponent } from './build-pizza/build-pizza.component';
import { InvalidUrlComponent } from './invalid-url/invalid-url.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'order-pizza', component: OrderPizzaComponent},
  {path: 'build-pizza', component: BuildPizzaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'check-out', component: CheckOutComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'payment-successful', component: PaymentSuccessfulComponent},
  {path: '**', component: InvalidUrlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
