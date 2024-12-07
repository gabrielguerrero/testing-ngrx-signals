import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { signalStore } from '@ngrx/signals';
import { Subject } from 'rxjs';
import { beforeEach, expect, vi } from 'vitest';

import { ProductStore } from './demo.store';
import { Product } from '../models';
import { ProductService } from '../services/product.service';
import { mockProducts } from '../services/mock-backend/product.handler';

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

  it('setProductsLoaded should change status to loaded ', () => {
    const store = TestBed.inject(ProductStore);
    store.setProductsLoaded();
    expect(store.productsStatus()).toBe('loaded');
    expect(store.isProductsLoaded()).toBe(true);
  });

  it('setProductsError should set the error ', () => {
    const store = TestBed.inject(ProductStore);
    const error = new Error('error');
    store.setProductsError(error);
    expect(store.productsError()).toBe(error);
  });

  describe('loadProducts', () => {
    it('should call backend and store result', async () => {
      const serviceMock = TestBed.inject(ProductService);
      const results = new Subject<{
        resultList: Product[];
        total: number;
      }>();
      vi.spyOn(serviceMock, 'getProducts').mockReturnValue(results);
      const store = TestBed.inject(ProductStore);
      store.loadProducts({});
      expect(store.isProductsLoading()).toBe(true);
      results.next({ resultList: mockProducts, total: mockProducts.length });
      expect(store.products().length).toEqual(mockProducts.length);
      expect(store.isProductsLoaded()).toBe(true);
      expect(store.productsError()).toBe(null);
    });

    it('should store error if backend and call fails', () => {
      const serviceMock = TestBed.inject(ProductService);
      const results = new Subject<{
        resultList: Product[];
        total: number;
      }>();
      vi.spyOn(serviceMock, 'getProducts').mockReturnValue(results);
      const store = TestBed.inject(ProductStore);
      store.loadProducts({ search: 'error' });
      expect(store.isProductsLoading()).toBe(true);
      const error = new Error('error');
      results.error(error);
      expect(store.isProductsLoaded()).toBe(false);
      expect(store.productsError()).toBe(error);
    });
  });
});
