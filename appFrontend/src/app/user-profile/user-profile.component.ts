import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId: any;
  userLoggedIn: boolean = false;
  msg: string;
  userDetails: any;
  userName: any;
  userPhone: number;
  userPassword: any;
  userAppWalletAmount: number;
  editDetailsClicked: boolean = false;
  topUpBalanceClicked: boolean = false;

  userInfoUpdateForm: FormGroup;
  alert: boolean = false;
  topUpAmount: number = 0;
  userWalletInfo: any;
  _id: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userInfoUpdateForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
    

    ///////////////header reload code here

    if(sessionStorage.getItem('isLoggedIn') === 'true'){
      this.userLoggedIn = true;
      this.userId = sessionStorage.getItem('userId');
      console.log(this.userId);
      this.userService.getUserById(this.userId).subscribe( (response: {status: boolean, msg: string, user: []}) => {
        console.log(response.user);
        this.userDetails = response.user;
        console.log(this.userDetails[0]);
        this.userName = this.userDetails[0].userName;
        this.userPhone = this.userDetails[0].phoneNumber;
        this.userPassword = this.userDetails[0].password;
        this.userAppWalletAmount = this.userDetails[0].appWalletAmount;
        this._id = this.userDetails[0]._id;

        
      });
    }
    else{
      this.msg = 'Unable to display user details. Please login with valid user credentials!';
    }
  }

  onClickEditDetails(){
    this.editDetailsClicked = true;
  }

  onClickTopUpWallet(){
    this.topUpBalanceClicked = true;
  }

  updateWalletBalance(){
    console.log('inside updateWalletBalance');
    this.userWalletInfo = {_id: this._id, userId: this.userId, topUpAmount: this.topUpAmount, appWalletAmount: this.userAppWalletAmount};
    console.log(this.userWalletInfo);
    this.userService.updateUserWalletBalanceAfterTopUp(this.userWalletInfo).subscribe( (response: {status: boolean, msg: string, updatedUserWalletAmount: any}) => {
      if(response.status === false){
        this.msg = response.msg;
        this.alert = true;
      }
      else{
        console.log(response.updatedUserWalletAmount);
        this.userAppWalletAmount = response.updatedUserWalletAmount;
        this.alert = false;
        this.msg = response.msg;
      }
    });

    this.topUpBalanceClicked = false;
    this.editDetailsClicked = false;
  }


  submitUserUpdateInfoForm(){


    //////////////////////
    if(this.userInfoUpdateForm.valid){
      if(this.userInfoUpdateForm.value.password === this.userInfoUpdateForm.value.re_password){
        console.log('Passwords match');
        this.msg = 'Processing...';
        
        let userCreds = {userId: this.userId, userName: this.userInfoUpdateForm.value.userName, password: this.userInfoUpdateForm.value.password, phoneNumber: this.userInfoUpdateForm.value.phoneNumber};
        console.log(userCreds);
        this.userService.updateUserInfo(userCreds).subscribe( (response: {status: boolean, msg: string, user: []}) => {
          if(response.status === false){
            this.alert = true;
            console.log(response.msg);
            this.msg = response.msg;
            this.userInfoUpdateForm.reset();
            
          }
          else{
            this.alert = false;
            console.log(response.msg);
            this.msg = response.msg;
            console.log(response.user);
            this.userDetails = response.user;
            console.log(this.userDetails[0]);
            this.userName = this.userDetails[0].userName;
            this.userPhone = this.userDetails[0].phoneNumber;
            this.userPassword = this.userDetails[0].password;
            this.userAppWalletAmount = this.userDetails[0].appWalletAmount;

            this.editDetailsClicked = false;
            this.topUpBalanceClicked = false;
          }
        });

      }
      else{
        console.log('Passwords do not match!')
        this.alert = true;
        this.msg = 'Passwords do not match!';
      }
    }
    else{
      console.log('Invalid username or password!')
      this.alert = true;
      this.msg = 'Invalid username or password!';
    }

    ////////////////////////
  }

  onKey(event){
    console.log('inside keyup');
    console.log(event.target.value);
    this.topUpAmount = parseFloat(event.target.value);
    console.log(this.topUpAmount);
    this.updateWalletBalance();
  }

}
