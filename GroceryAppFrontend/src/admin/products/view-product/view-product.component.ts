import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Product } from 'src/shared/model/sharedModels';
import { ProductService } from 'src/shared/services/product/product.service';

@Component({
  selector: 'admin-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent {
  productList: Product[] = [];
  subscriptions: Subscription[] = [];
  productListLength = 0;
  isLoading = true;

  searchForm: FormGroup = new FormGroup({});
  pageEvent: PageEvent = {
    length: 10,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
  };
  sortIcon = '';
  sortState = 'unsorted';
  displayedColumns = [
    '',
    'Brand',
    'Product',
    'Category',
    'Price',
    'Rating',
    '',
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.handlePagination();
    this.searchForm.valueChanges.subscribe({
      next: (value) => {
        this.handlePagination();
      },
    });
  }

  initForm() {
    this.searchForm = this.fb.group({
      searchQuery: this.fb.control(''),
    });
  }

  handlePagination() {
    this.isLoading = true;

    const searchString = this.searchForm.controls['searchQuery'].value
      ? this.searchForm.controls['searchQuery'].value.length >= 3
        ? '/search?q=' + this.searchForm.controls['searchQuery'].value + '&'
        : '?'
      : '?';
    this.subscriptions.forEach((sub) => sub.unsubscribe);
    const sub = this.productService
      .getPaginatedProducts(
        searchString,
        this.pageEvent.pageIndex + 1,
        this.pageEvent.pageSize
      )
      .subscribe({
        next: (res) => {
          console.log('Search String: ' + searchString);
          this.productList = res.data.content;
          this.productListLength = res.data.totalElements;
          console.log(this.productList);
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
