import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  msg: string ='';
  alert: boolean = false;
  userCreds = {userName: '', password: ''};
  userDetails: any;
  user: any;

  currentStyle : any;  
  

  constructor(private formBuilder: FormBuilder, private router: Router, 
    private userService: UserService) { }

  ngOnInit() {
    if(sessionStorage.getItem('flag') === 'set'){
      location.reload();
      sessionStorage.setItem('flag', 'unset');
    }

    // this.currentStyle = { 'color': this.alert ? 'red' : 'green'};

    this.userLoginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLoginForm(){
    if(this.userLoginForm.valid){
      this.alert = false;
      this.msg = 'verifying...';
      console.log(this.userLoginForm.value);
      this.userCreds.userName = this.userLoginForm.value.userName;
      this.userCreds.password = this.userLoginForm.value.password
      console.log(this.userCreds);
      this.userService.validateUser(this.userCreds).subscribe( (response:{status: boolean, msg: string, user: []}) => {
        if(response.status === true){
          console.log(response);
          this.msg = response.msg;
          this.user = response.user;
          sessionStorage.setItem('userId', this.user[0].userId);
          sessionStorage.setItem('isLoggedIn', 'true');
          this.userService.getUserByName(this.userCreds.userName).subscribe( (response:{status: boolean, msg: string, user: []}) => {
            console.log(response);
            this.userDetails = response.user;
            console.log(this.userDetails);
            sessionStorage.setItem('flag', 'set');
            this.router.navigate(['order-pizza']);
          });
          
        }
        else{
          console.log(response);
          this.alert = true;
          this.msg = response.msg;
          this.userLoginForm.reset();
        }
      });
    }
    else{
      console.log('Invalid username or password!')
      this.alert = true;
      this.msg = 'Invalid username or password!';
      this.userLoginForm.reset();
    }
    console.log(this.alert);
    this.currentStyle = { 'color': this.alert ? 'red' : 'green'};
  }

}
