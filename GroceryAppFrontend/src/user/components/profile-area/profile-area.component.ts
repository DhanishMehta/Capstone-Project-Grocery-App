import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { valHooks } from 'jquery';
import { User } from 'src/shared/model/userModel';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { UserService } from 'src/shared/services/user/user.service';

@Component({
  selector: 'user-profile-area',
  templateUrl: './profile-area.component.html',
  styleUrls: ['./profile-area.component.scss']
})
export class ProfileAreaComponent implements OnInit{
  user!: User;
  editUserForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private snackbar: MatSnackBar){};

  ngOnInit(): void {
      this.getUserDetails();
  }

  getUserDetails(){
    const userId = this.authService.getUserId();
    if(userId !== null){
      this.userService.getUserById(userId).subscribe({
        next: (res) => {
          this.user = res.data;
          this.initForm();
        }
      })
    }
  }

  initForm(){
    this.editUserForm = this.fb.group({
      firstname: this.fb.control(this.user.userFirstName, [Validators.required, Validators.minLength(3), Validators.maxLength(17)]),
      lastname: this.fb.control(this.user.userLastName, [Validators.required, Validators.minLength(3), Validators.maxLength(17)]),
      email: this.fb.control(this.user.userEmail, [Validators.email, Validators.required]),
      phoneNo: this.fb.control(this.user.userPhone,[Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
    })
  }

  handleEditUser() {
    if(this.editUserForm.valid){
      let updatedUser = this.user;
      const formValue = this.editUserForm.value;
      updatedUser.userFirstName = formValue.firstname;
      updatedUser.userLastName = formValue.lastname;
      updatedUser.userEmail = formValue.email;
      updatedUser.userPhone = formValue.phoneNo;

      this.userService.updateUser(updatedUser, this.user.userId!).subscribe({
        next: (res) => {
          if(res.success) {
            this.snackbar.open("User details updated", "Yayy!", {
              duration: 3000
            });
          } else {
            this.snackbar.open("Unable to edit user details", "Try later!", {
              duration: 3000
            });
          }
        }
      })
    }
  }
}
