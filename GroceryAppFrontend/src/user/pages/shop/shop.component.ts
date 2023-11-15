import { Component } from '@angular/core';
import { ProductTabViewOptions } from 'src/shared/model/utility';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  productTabViewOptions: ProductTabViewOptions = {
    sectionTitle: false,
    shopOptions: true,
    pagination: true,
    filterOptions: true,
  }
}
