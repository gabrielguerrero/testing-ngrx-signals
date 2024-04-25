import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatList, MatListItem } from '@angular/material/list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from '../models';
import { MatDivider } from '@angular/material/divider';
import { ProductsRemoteStore } from './product-remote.store';

@Component({
  selector: 'product-list-detail-remote',
  template: `
    <form class="p-8 pb-0">
      <mat-form-field appearance="outline" subscriptSizing="dynamic">
        <mat-label>Search</mat-label>
        <input
          type="text"
          matInput
          [ngModel]="store.productsFilter().search"
          name="search"
          (ngModelChange)="
            store.filterProductsEntities({ filter: { search: $event } })
          "
        />
      </mat-form-field>
    </form>
    @if (store.productsCurrentPage().isLoading) {
      <mat-spinner />
    } @else {
      <div class="list-detail">
        <div>
          <mat-list>
            <!-- 👇 we use store.entitiesCurrentPage().entities
              instead of store.entities() ↓ -->
            @for (
              product of store.productsCurrentPage().entities;
              track product.id
            ) {
              <mat-list-item
                [class.selected]="store.productsEntitySelected() === product"
                (click)="select(product)"
                >{{ product.name }}
              </mat-list-item>
            }
          </mat-list>
          <!-- 👇 entitiesCurrentPage has all the props
                  needed for the paginator, and loadEntitiesPage
                  handles page changes -->
          <mat-paginator
            [length]="store.productsCurrentPage().total"
            [pageSize]="store.productsCurrentPage().pageSize"
            [pageIndex]="store.productsCurrentPage().pageIndex"
            (page)="store.loadProductsPage($event)"
          />
        </div>
        @if (store.isLoadProductDetailLoading()) {
          <mat-spinner />
        } @else if (store.isLoadProductDetailLoaded()) {
          <product-detail [product]="store.loadProductDetailResult()!" />
        } @else {
          <div class="content-center"><h2>Please Select a product</h2></div>
        }
      </div>
    }
  `,
  styleUrl: './product-list-detail-component.css',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonModule,
    AsyncPipe,
    JsonPipe,
    MatListItem,
    MatList,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ProductDetailComponent,
    MatDivider,
  ],
  providers: [ProductsRemoteStore],
})
export class ProductListDetailRemoteComponent {
  store = inject(ProductsRemoteStore);

  select({ id }: Product) {
    this.store.selectProductsEntity({ id });
    this.store.loadProductDetail({ id });
  }
}
