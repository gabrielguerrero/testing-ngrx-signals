import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { signalStore } from '@ngrx/signals';
import { Subject } from 'rxjs';
import { beforeEach, expect, vi } from 'vitest';

import { ProductStore } from './demo.store';
import { Product } from '../models';
import { ProductService } from '../services/product.service';

describe('ProductStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductStore, provideHttpClient(), ProductService],
    });
  });

  it('setProductsLoading should change status to loading ', () => {
    const store = TestBed.inject(ProductStore);
    store.setProductsLoading();
    expect(store.productsStatus()).toBe('loading');
    expect(store.isProductsLoading()).toBe(true);
  });

  it('setProductsLoaded should change status to loaded ', () => {});
  it('setProductsError should set the error ', () => {});

  describe('loadProducts', () => {
    it('should call backend and store result', async () => {});

    it('should store error if backend and call fails', () => {});

    it('should store error if backend and call fails', () => {});
  });
});
