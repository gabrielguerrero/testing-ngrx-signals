import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';

import { ProductStore } from './demo.store';
import { ProductSearchFormComponent } from '../components/product-search-form/product-search-form.component';

@Component({
  selector: 'demo',
  standalone: true,
  imports: [MatList, MatListItem, ProductSearchFormComponent],
  providers: [ProductStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Products List Demo</h1>
    <product-search-form
      (searchProductChange)="store.loadProducts({ search: $event!.search })"
    />
    @if (store.isProductsLoading()) {
      <p class="m-8">Loading...</p>
    } @else if (store.isProductsLoaded()) {
      <mat-list role="list">
        @for (product of store.products(); track product.id) {
          <mat-list-item role="listitem">{{ product.name }}</mat-list-item>
        }
      </mat-list>
    } @else {
      <p>Error</p>
    }
  `,
})
export class DemoComponent {
  store = inject(ProductStore);
}
