import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { CategoryOfTree, Product } from 'src/shared/model/productModel';
import { ProductTabViewOptions } from 'src/shared/model/utility';
import { ProductService } from 'src/shared/services/product/product.service';

@Component({
  selector: 'user-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.scss'],
})
export class ProductTabComponent implements OnInit, OnDestroy {
  @Input() productTabViewOptions!: ProductTabViewOptions;
  isLoading: boolean = true;
  subscriptions: Subscription[] = [];
  productsList: Product[] = [];
  categoryList: CategoryOfTree[] = [];
  
  selectedCategory = 0;
  selectedProduct!: Product;
  selectedCategoryName = '';
  
  searchQuery!: FormControl;
  sortBy!: FormControl;
  page: PageEvent = {
    pageIndex: 0,
    pageSize: 12,
    previousPageIndex: 0,
    length: 12,
  };
  paginatorShowingString = '';

  constructor(private productService: ProductService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.populateCategoryList();
    this.sortBy = this.fb.control('');
    this.searchQuery = this.fb.control('');
    this.filterOnChange();
    this.searchOnChange();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  populateProductsList() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.isLoading = true;
    const category = this.categoryList.find(
      (category) => category.id === this.selectedCategory
    );
    console.log(this.categoryList);
    console.log(this.selectedCategory);
    console.log(category);
    const sub = this.productService
      .getPaginatedProducts(
        `/search?q=${this.searchQuery.value}&`,
        this.page.pageIndex + 1,
        this.page.pageSize,
        category?.slug!,
        this.sortBy.value
      )
      .subscribe({
        next: (res) => {
          this.productsList = res.data.content;
          this.isLoading = false;
        },
      });
    this.subscriptions.push(sub);
  }

  populateCategoryList() {
    this.isLoading = true;
    this.productService.getCategoryTree().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        this.selectedCategory = this.categoryList[0].id;
        this.populateProductsList();
      },
    });
  }

  handleCategoryChange(categoryId: number) {
    this.selectedCategory = categoryId;
    this.populateProductsList();
  }

  changeSelected(product: Product) {
    this.selectedProduct = product;
  }

  handlePageChange() {

    const startingIndex = this.page.pageIndex * this.page.pageSize + 1;
    const endingIndex = startingIndex + this.page.pageSize;
    this.paginatorShowingString = `Showing ${startingIndex}-${endingIndex} of ${this.page.length}`;
  }

  filterOnChange(){
    this.sortBy.valueChanges.subscribe({
      next: (data) => {
        this.populateProductsList();
      }
    })
  }

  searchOnChange(){
    this.searchQuery.valueChanges.subscribe({
      next: () => {
        this.populateProductsList();
      }
    })
  }
}
