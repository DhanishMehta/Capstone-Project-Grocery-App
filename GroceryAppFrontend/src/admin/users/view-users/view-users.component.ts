import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/shared/model/sharedModels';
import { UserService } from 'src/shared/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {
  userList: User[] = [];
  subscriptions: Subscription[] = [];
  userListLength = 0;
  isLoading = true;

  searchForm: FormGroup = new FormGroup({});
  pageEvent: PageEvent = new PageEvent();
  sortIcon = '';
  sortState = 'unsorted';
  displayedColumns = [
    'UserID',
    'First Name',
    'Last Name',
    'Phone No',
    'Email ID',
    'User Role',
  ];

  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    this.initForm();
    this.handlePagination();

    
  }
  
  initForm() {
    this.searchForm = this.fb.group({
      searchQuery: this.fb.control(''),
    });
  }
  
  handlePagination(){
    this.isLoading = true;
    this.subscriptions.forEach(sub => sub.unsubscribe);
    const sub = this.userService
    .getPaginatedUsers(this.pageEvent.pageIndex, this.pageEvent.pageSize)
    .subscribe({
      next: (res) => {
        this.userList = res.data;
        this.userListLength = this.userList.length;
        this.isLoading = false;
        },
      });
    this.subscriptions.push(sub);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.handlePagination();
  }
}
