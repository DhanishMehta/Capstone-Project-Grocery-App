import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/shared/model/reqResModel';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  loginForm!: FormGroup;
  usernames: string[] = [];
  submissionTried = 0;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackbar: MatSnackBar, private router: Router) {}
  ngOnInit(): void {
    if(this.authService.isLoggedIn()) 
      this.ifUserLoggedIn();
    else this.ifUserLoggedOut();
  }
  
  ifUserLoggedIn() {
    this.snackbar.open("User already logged in!!", "Great");
    this.router.navigate(['/']);
  }
  
  ifUserLoggedOut() {
    this.initForm();
    this.getAllUsernames();
  }

  initForm() {
    this.loginForm = this.fb.group({
      userEmail: this.fb.control('', [Validators.required, Validators.email]),
      userPassword: this.fb.control('', [Validators.required]),
    });
  }

  getAllUsernames() {
    this.authService.getAllUsernames().subscribe({
      next: (res) => {
        if (res.success) {
          this.usernames = res.data;
        } else {
          console.error('Failed to get usernames');
        }
      },
    });
  }

  isEmailUnique() {
    const newEmail = this.loginForm.controls['userEmail'].value;
    if (this.usernames.includes(newEmail)) return false;
    else return true;
  }

  buildAuthReq() {
    const formValue = this.loginForm.value;
    const authDetails:AuthenticationRequest =  {
      userEmail: formValue.userEmail,
      userPassword: formValue.userPassword
    }
    return authDetails;
  }

  handleLogin() {
    if(this.loginForm.valid) {
      this.submissionTried++;
      if(this.isEmailUnique()){
        return;
      }
      console.log(this.buildAuthReq());
      this.authService.authenticate(this.buildAuthReq()).subscribe({
        next: (res) => {
          console.log("inside authenticate request");
          let message = "Failed to Log In";
          let action = "Try later";
          console.log(res);
          if(res.success){
            message = "Logged In Successfully";
            action = "Yayy!";
            this.authService.setRole(res.data.data.userRole);
            this.authService.setToken(res.data.token);
            this.authService.setUserId(res.data.data.userId!);
            // this.snackbar.open(message, action, {
            //   duration: 2000
            // });
            this.router.navigate(["/"]);
          } else {
            this.snackbar.open(message, action, {
              duration: 3000
            });
          }
        },
        error: (er) => {
          console.error(er);
        }
      })
    }
  }
}
