import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { signalStore } from '@ngrx/signals';
import { Subject } from 'rxjs';
import { beforeEach, expect, vi } from 'vitest';

import { ProductStore } from './demo.store';
import { withLoadProducts } from './with-load-products';
import { Product } from '../models';
import { ProductService } from '../services/product.service';

describe('ProductStore', () => {
  const mockProducts: Product[] = [
    {
      id: 'p1',
      name: 'Wireless Mouse',
      description: 'A sleek and ergonomic wireless mouse with adjustable DPI.',
      price: 29.99,
    },
    {
      id: 'p2',
      name: 'Mechanical Keyboard',
      description:
        'A durable keyboard with customizable RGB backlighting and tactile switches.',
      price: 79.99,
    },
    {
      id: 'p3',
      name: 'Gaming Headset',
      description:
        'A comfortable headset with immersive surround sound and a noise-canceling microphone.',
      price: 59.99,
    },
    {
      id: 'p4',
      name: '4K Monitor',
      description:
        'A 27-inch 4K UHD monitor with vivid colors and ultra-thin bezels.',
      price: 299.99,
    },
    {
      id: 'p5',
      name: 'Portable SSD',
      description:
        'A high-speed portable SSD with 1TB of storage and USB-C compatibility.',
      price: 99.99,
    },
  ];

  const Store = signalStore(withLoadProducts());
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Store, ProductStore, provideHttpClient(), ProductService],
    });
  });

  it('setProductsLoading should change status to loading ', () => {
    const store = TestBed.inject(ProductStore);
    store.setProductsLoading();
    expect(store.productsStatus()).toBe('loading');
    expect(store.isProductsLoading()).toBe(true);
    store.setProductsLoaded();
    TestBed.flushEffects();
    expect(store.loaded()).toBe(true);
  });

  it('without TesBed setProductsLoading should change status to loading ', () => {
    TestBed.runInInjectionContext(() => {
      const store = new ProductStore();
      store.setProductsLoading();
      expect(store.productsStatus()).toBe('loading');
      expect(store.isProductsLoading()).toBe(true);
      store.setProductsLoaded();
      TestBed.flushEffects();
      expect(store.loaded()).toBe(true);
    });
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
      expect(store.products().length).toEqual(5);
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
