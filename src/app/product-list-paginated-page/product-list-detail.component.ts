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

@Component({
  selector: 'product-list-detail',
  template: `
    <form>
      <mat-form-field>
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
      <div>
        <mat-list>
          <!-- 👇 we use store.entitiesCurrentPage().entities
            instead of store.entities() ↓ -->
          @for (
            product of store.entitiesCurrentPage().entities;
            track product.id
          ) {
            <mat-list-item>{{ product.name }}</mat-list-item>
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
    }
  `,
  styles: [
    `
      mat-card-content > mat-spinner {
        margin: 10px auto;
      }
      mat-card-actions mat-spinner {
        display: inline-block;
        margin-right: 5px;
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
  ],
  providers: [ProductsLocalStore],
})
export class ProductListDetail {
  store = inject(ProductsLocalStore);
}
