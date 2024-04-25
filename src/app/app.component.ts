import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListDetail } from './product-list-detail/product-list-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListDetail],
  template: '<product-list-detail/>',
})
export class AppComponent {
  title = 'ngrx-traits-signals-playground';
}
