import { BreakpointObserver } from '@angular/cdk/layout';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { getInfiniteScrollDataSource } from '@ngrx-traits/signals';
import { map } from 'rxjs/operators';

import { ProductBranchRemoteInfiniteStore } from './product-remote-infinite.store';
import { Branch } from '../models';

@Component({
  selector: 'product-branch-infinite-list',
  standalone: true,
  imports: [
    CommonModule,
    MatList,
    MatListItem,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel,
    MatProgressSpinner,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
  ],
  template: `
    @if (isMobile()) {
      <cdk-virtual-scroll-viewport itemSize="42" class="fact-scroll-viewport">
        <mat-list>
          <mat-list-item
            *cdkVirtualFor="let item of dataSource; trackBy: trackByFn"
            >{{ item.name }}</mat-list-item
          >
        </mat-list>
      </cdk-virtual-scroll-viewport>
    } @else {
      @if (store.entitiesCurrentPage().isLoading) {
        <mat-spinner />
      } @else {
        <mat-list>
          @for (
            product of store.entitiesCurrentPage().entities;
            track product.id
          ) {
            <mat-list-item>{{ product.name }}</mat-list-item>
          }
        </mat-list>
        <div>
          <button
            mat-button
            [disabled]="!store.entitiesCurrentPage().hasPrevious"
            (click)="store.loadEntitiesPreviousPage()"
          >
            previous
          </button>
          <button
            mat-button
            [disabled]="!store.entitiesCurrentPage().hasNext"
            (click)="store.loadEntitiesNextPage()"
          >
            next
          </button>
        </div>
      }
    }
  `,
  styles: `
    :host {
      display: block;
      height: 100dvh;
    }
    .fact-scroll-viewport {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100dvh;
      width: 100%;
    }
  `,
  providers: [ProductBranchRemoteInfiniteStore],
})
export class ProductBranchListInfiniteComponent {
  store = inject(ProductBranchRemoteInfiniteStore);
  dataSource = getInfiniteScrollDataSource({ store: this.store });
  breakpointObserver = inject(BreakpointObserver);
  isMobile = toSignal(
    this.breakpointObserver
      .observe('(max-width: 640px)')
      .pipe(map((result) => result.matches)),
  );

  trackByFn(index: number, item: Branch) {
    return item.id;
  }
}
