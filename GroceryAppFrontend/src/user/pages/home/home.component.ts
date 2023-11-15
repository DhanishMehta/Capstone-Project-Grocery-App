import { Component } from '@angular/core';
import { ProductTabViewOptions } from 'src/shared/model/utility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  productTabViewOptions: ProductTabViewOptions = {
    sectionTitle: true,
    shopOptions: false,
    pagination: false,
    filterOptions: false,
  };
}
