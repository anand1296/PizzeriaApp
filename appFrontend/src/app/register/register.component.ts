import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegForm: FormGroup;
  msg: string ='';
  alert: boolean = false;
  userCount: number;

  constructor(private formBuilder: FormBuilder, private router: Router, 
    private userService: UserService) { }

  ngOnInit() {
    this.userRegForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  submitRegForm(){
    
    // console.log(userCount);
    if(this.userRegForm.valid){
      this.userCount = 1600;
      if(this.userRegForm.value.password === this.userRegForm.value.re_password){
        console.log('Passwords match');
        this.msg = 'Processing...';
        this.userService.getUserCount().subscribe( (response:number) => {
          console.log(response);
          this.userCount += (response+1);
          console.log(this.userCount);
        
        let userCreds = {userId: this.userCount, userName: this.userRegForm.value.userName, password: this.userRegForm.value.password, phoneNumber: this.userRegForm.value.phoneNumber};
        console.log(userCreds);
        this.userService.registerUser(userCreds).subscribe( (response: {status: boolean, msg: string, user: []}) => {
          if(response.status === false){
            this.alert = true;
            console.log(response.msg);
            this.msg = response.msg;
            this.userCount = 1600;
            this.userRegForm.reset();
            
          }
          else{
            this.alert = false;
            console.log(response.msg);
            this.msg = response.msg;
            this.router.navigate(['/login']);
          }
        });
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
  }

}
