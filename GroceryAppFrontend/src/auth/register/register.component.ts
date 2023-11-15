import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/shared/model/userModel';
import { AuthService } from 'src/shared/services/auth/auth.service';

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class AuthRegisterComponent {
  registerForm!: FormGroup;
  userToken: string = '';
  usernames: string[] = [];
  isPasswordVisibile = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getAllUsernames();
  }

  initForm() {
    this.registerForm = this.fb.group({
      userFirstName: this.fb.control('', [Validators.required]),
      userLastName: this.fb.control('', [Validators.required]),
      userPhone: this.fb.control('', [Validators.required]),
      userEmail: this.fb.control('', [Validators.required, Validators.email]),
      userPassword: this.fb.control('', [
        Validators.required,
        Validators.pattern(StrongPasswordRegx),
      ]),
    });
  }

  isEmailUnique() {
    const newEmail = this.registerForm.controls['userEmail'].value;
    if (this.usernames.includes(newEmail)) return false;
    else return true;
  }

  buildNewUser(): User {
    const formValue = this.registerForm.value;
    let newUser: User = {
      userFirstName: formValue.userFirstName,
      userLastName: formValue.userLastName,
      userPhone: formValue.userPhone,
      userEncryptedPassword: formValue.userPassword,
      userEmail: formValue.userEmail,
      userRole: "USER",
      userSavedAddresses: []
    }
    return newUser;
  }

  handleRegister() {
    if (this.registerForm.valid) {
      if (!this.isEmailUnique()) {
        this.snackBar.open('This Email already exists.', 'Okay');
        return;
      }
      const newUser = this.buildNewUser();
      this.authService.register(newUser).subscribe({
        next: (res) => {
          let message = 'User Registration Failed';
          let action = 'Try again later!';
          if (res.success) {
            console.log(res);
            message = 'User Registered Successfully';
            action = 'Yayy!!';
            this.authService.setToken(res.data.token);
            this.authService.setRole(res.data.data.userRole);
            this.authService.setUserId(res.data.data.userId!);
          }
          this.snackBar.open(message, action, {
            duration: 3000,
          });
          this.router.navigate(['/']);
        },
      });
    }
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

  togglePasswordVisibility(){
    const passwordInput = (document.getElementById("floatingPassword") as HTMLInputElement);
    if(passwordInput.type === 'password'){
      passwordInput.type = 'text';
      this.isPasswordVisibile = true;
    }
    else{
      passwordInput.type = 'password'
      this.isPasswordVisibile = false;
    }
  }
}
