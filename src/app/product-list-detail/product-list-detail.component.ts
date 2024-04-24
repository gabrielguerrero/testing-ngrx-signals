import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductsLocalStore } from './product.store';
import { MatList, MatListItem } from '@angular/material/list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from '../models';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'product-list-detail',
  template: `
    <form class="p-8 pb-0">
      <mat-form-field appearance="outline" subscriptSizing="dynamic">
        <mat-label>Search</mat-label>
        <input
          type="text"
          matInput
          [ngModel]="store.entitiesFilter().search"
          name="search"
          (ngModelChange)="store.filterEntities({ filter: { search: $event } })"
        />
      </mat-form-field>
    </form>
    @if (store.isLoading()) {
      <mat-spinner />
    } @else {
      <div class="m-8 grid sm:grid-cols-2 gap-8">
        <div>
          <mat-list>
            <!-- 👇 we use store.entitiesCurrentPage().entities
              instead of store.entities() ↓ -->
            @for (
              product of store.entitiesCurrentPage().entities;
              track product.id
            ) {
              <mat-list-item
                [class.selected]="store.entitySelected() === product"
                (click)="select(product)"
                >{{ product.name }}
              </mat-list-item>
            }
          </mat-list>
          <!-- 👇 entitiesCurrentPage has all the props
                  needed for the paginator, and loadEntitiesPage
                  handles page changes -->
          <mat-paginator
            [length]="store.entitiesCurrentPage().total"
            [pageSize]="store.entitiesCurrentPage().pageSize"
            [pageIndex]="store.entitiesCurrentPage().pageIndex"
            (page)="store.loadEntitiesPage($event)"
          />
        </div>
        @if (store.isLoadProductDetailLoading()) {
          <mat-spinner />
        } @else if (store.isLoadProductDetailLoaded()) {
          <product-detail [product]="store.loadProductDetailResult()" />
        } @else {
          <div class="content-center"><h2>Please Select a product</h2></div>
        }
      </div>
    }
  `,
  styles: [
    `
      .selected {
        background-color: #009688;
      }
    `,
  ],
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
  providers: [ProductsLocalStore],
})
export class ProductListDetail {
  store = inject(ProductsLocalStore);

  select({ id }: Product) {
    this.store.selectEntity({ id });
    this.store.loadProductDetail({ id });
  }
}
