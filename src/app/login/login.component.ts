import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userName:string="";
  password:string="";
  errorMessage:string="";

  constructor(private router:Router,private authService:AuthService){}

  login(){
    /*if(this.userName&&this.password){
      this.authService.login(this.userName,this.password).subscribe(
        ()=>{
          this.errorMessage="";
        },
        error=>{
          this.errorMessage='Enter correct credentials';
        }
      )
    }
    else{
      this.errorMessage = "Please enter both username and password";
    }*/
      this.router.navigate(['/dashboard']);
    
  }
}
