import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatGridListModule, MatCardModule, MatBadge, MatBadgeModule, MatMenuModule, MatMenuTrigger, MatCheckboxModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { BuildPizzaComponent } from './build-pizza/build-pizza.component';
import { HttpClientModule } from '@angular/common/http';
import { PizzaService } from './pizza.service';
import { IngredientsService } from './ingredients.service';
import { CartService } from './cart.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InvalidUrlComponent } from './invalid-url/invalid-url.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { CheckOutComponent } from './check-out/check-out.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';
import { TestChatComponent } from './test-chat/test-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    OrderPizzaComponent,
    BuildPizzaComponent,
    LoginComponent,
    RegisterComponent,
    InvalidUrlComponent,
    CheckOutComponent,
    UserProfileComponent,
    PaymentSuccessfulComponent,
    TestChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [PizzaService, IngredientsService, CartService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
